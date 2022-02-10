class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)
    this.scene = scene; // the scene this container will be added to
    this.x = x;
    this.y = y;
    this.velocity = 600; // player velocity
    this.magicRunning = false;
    this.stopMoving = false;

    this.selectedMagic = 'fire'

    this.loaded = false

    this.interval = null;

    this.anims.play(`mage_spawn`).anims.chain({ key: `idle_down`, repeat: -1 })

    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
      this.loaded = true  
    }, this);
    

    this.lastAnimation = `idle_down`;
    this.lastFlipX = null;

    this.scene.events.on('magic_collision', (magic) => {
      if (this.interval) {
        clearInterval(this.interval)
      }
    });

    this.scene.events.on('magic_selected', (magic) => {
      this.selectedMagic = magic
    });

    // this.anims.play({ key: 'down', repeat: -1 })
    // enable physics
    this.scene.physics.world.enable(this);
    // set immable if another object collides with our player
    this.setImmovable(false);
    // scale oyr player
    this.setScale(2);
    // colide with world bounds
    this.body.setCollideWorldBounds(true);
    // add the to our existing scene
    this.scene.add.existing(this);
    // have the caramera following the player
    this.scene.cameras.main.startFollow(this)

    // this.createHealthBar();
  }

  setMagics(magics) {
    this.magics = magics
  }

  throwMagic(name) {
    if (!this.magics) return
    if (this.magicRunning) return


    this.magicRunning = true;
    this.stopMoving = true;
    this.body.setVelocity(0);
    const { key, damage, speed, delay, cooldown, x, y, vector, animation, magicAnimation, maxDistance } = new Magic(name, this.x, this.y, this.lastAnimation, this.lastFlipX).get()
    const magic = this.magics.get(x, y, key)

    if (!magic) return

    magic.setActive(false)
    magic.setVisible(false)

    this.anims.play(animation, true)
   
    this.scene.time.delayedCall(delay, () => {
      const vec = new Phaser.Math.Vector2(vector.x, vector.y);
      
      magic.setVelocity(vec.x * speed, vec.y * speed);
      magic.setScale(2)
      magic.setSize(20, 18, true);
      magic.setFlipX(!this.lastFlipX)

      magic.setActive(true)
      magic.setVisible(true)
      
      magic.anims.play({key: magicAnimation, repeat: -1}, true)

    
      this.stopMoving = false;
      this.scene.time.delayedCall(cooldown-delay, () => {
        this.magicRunning = false;
        this.anims.stop()
      })

    }, [], this);

    this.interval = setInterval(() => {
      switch (this.lastAnimation) {
        case 'idle_up':
          if (maxDistance > magic.y) {
            magic.destroy() 
            clearInterval(this.interval)
          }
          break
        case 'idle_down':
          if (maxDistance < magic.y) {
            magic.destroy() 
            clearInterval(this.interval)
          }
        break 
        case 'idle_side':
          if (this.lastFlipX) {
            if (maxDistance > magic.x) {
              magic.destroy() 
              clearInterval(this.interval)
            }
          } else {
            if (maxDistance < magic.x) {
              magic.destroy() 
              clearInterval(this.interval)
            }
          }
          break
      }
    }, 100)
  }

  handleBody() {
    if (this.body.velocity.x !== 0) {
      if (this.body.velocity.x > 0) {
        this.anims.play("move_side", true);
        this.lastFlipX = false;
      } else  {
        this.anims.play('move_side', true);
        this.lastFlipX = true;
      }
      
      this.lastAnimation = `idle_side`
    } else if (this.body.velocity.y !== 0) {
      if (this.body.velocity.y > 0) {
        this.anims.play('move_down', true);
        this.lastAnimation = `idle_down`
      } else {
        this.anims.play('move_up', true);
        this.lastAnimation = `idle_up`
      }
    } else {
      if (this.anims.isPlaying) return;

      if (this.body.velocity.x === 0 && this.body.velocity.y === 0 && !this.anims.isPlaying) {
        this.anims.play({ key: this.lastAnimation, repeat: -1 }, true);
        this.setFlipX(this.lastFlipX);
      } 
      else{
        this.anims.play({ key: this.lastAnimation, repeat: -1 }, true)
        this.setFlipX(this.lastFlipX)
      }
    }
  } 
  
  
  update(cursors) {
    if (!this.loaded) return 
    if(this.stopMoving) return
    this.handleBody();
    
    super.update
    {
      this.body.setVelocity(0);

      if(cursors.left.isDown) {
        this.body.setVelocityX(-this.velocity);
        this.setFlipX(true);
      }
      else if(cursors.right.isDown) {
        this.body.setVelocityX(this.velocity);
        this.setFlipX(false);
        this.lastFlipX = false;
      }

      if(cursors.up.isDown) {
        this.body.setVelocityY(-this.velocity);
      }
      else if(cursors.down.isDown) {
        this.body.setVelocityY(this.velocity); 
      }
    };

    if (Phaser.Input.Keyboard.JustDown(cursors.space)){
      this.throwMagic(this.selectedMagic)
      return
    }

   
  };
}
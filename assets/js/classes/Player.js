class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)
    this.scene = scene; // the scene this container will be added to
    this.velocity = 600; // player velocity

    this.loaded = false

    this.anims.play(`mage_spawn`).anims.chain({ key: `idle_down`, repeat: -1 })

    setTimeout(() => {
      this.loaded = true
    }, 1800)
    
    // this.anims.play({ key: `idle_down`, repeat: -1 });

    this.lastAnimation = `idle_down`;
    this.lastFlipX = null;
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

   
  }

  handleAnimation() {
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
  
  throwMagic() {

    const vec = new Phaser.Math.Vector2(0, 0);
    switch (this.lastAnimation) {
      case 'idle_up':
        vec.y = -1
        break
      case 'idle_down':
        vec.y = 1
        break 
      case 'idle_side':
        if (this.lastFlipX) {
          vec.x = 1
        } else {
          vec.x = -1
        }
        break
    };
  }

  update(cursors) {
    if (!this.loaded) return 

    this.handleAnimation();

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

    if (Phaser.Input.Keyboard.JustDown(!cursors.space)){

      return
    }
   
  };
}
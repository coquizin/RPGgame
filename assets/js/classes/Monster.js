class Monster extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, key, id, health, maxHealth) {
    super(scene, x, y, key);
    this.scene = scene;
    this.id = id;
    this.key = key;
    this.x = x;
    this.y = y;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = 10;
    this.range = 250;
    this.speed = 50;

    this.lastAnimation = `rat_idle_down`;
    this.lastFlipX = null;
 
    this.anims.play({ key: `${key}_idle_down`, repeat: -1}, true)
    // enable physics
    this.scene.physics.world.enable(this);

    this.setImmovable(true)
    // scale our monster
    this.setScale(2);
    // colide with world bounds
    this.body.setCollideWorldBounds(true);
    // add the monster to our existing scene
    this.scene.add.existing(this);

    this.createHealthBar()

    this.setOrigin(0);
  }

  update(cursors, player, monster) {
    this.x = monster.x;
    this.y = monster.y;
    this.updateHealthBar();
    this.startMovement(cursors, player);
    this.handleBody()
  }

  handleBody() {
    // console.log(this.body.velocity.x)
    if (this.body.velocity.x !== 0) {
      // console.log('b')
      if (this.body.velocity.x > 0) {
        this.anims.play("rat_move_side", true);
      } else  {
        this.anims.play('rat_move_side', true);
      }
    } else {
      if (this.body.velocity.y > 0) {
        this.anims.play('rat_move_down', true);
      } else {
        this.anims.play('rat_move_up', true);
      }
    } 
  } 


  startMovement(cursors, player) {
    const distanceX = player.x - this.x
    const distanceY = player.y - this.y

    const rotation = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)
    // console.log(rotation)
    
    if (Math.abs(distanceX) < this.range ||  Math.abs(distanceY) < this.range) {
    this.handleBody()
    if ((rotation >= 2.4) && (rotation <= 4) || (rotation <= -2.4) && (rotation >= -4)) {
      //"Left";
      this.setFlipX(true);
      this.setVelocityY(0);
      this.setVelocityX(Math.sign(distanceX) * this.speed);
    }
    if (((rotation >= 0) && (rotation <= 0.8)) || ((rotation >= 5.6) && (rotation <= 6.4)) || ((rotation <= 0) && (rotation >= -0.8)) || ((rotation <= -5.6) && (rotation >= -6.4))) {
      //"Right";
      this.setFlipX(false);
      this.setVelocityY(0);
      this.setVelocityX(Math.sign(distanceX) * this.speed);
    }
    if ((rotation > 4) && (rotation < 5.6) || (rotation < -4) && (rotation > -5.6)){
      // up
      this.setVelocityX(0)
      this.setVelocityY(Math.sign(distanceY) * this.speed);
    }

   if ((rotation > 0.8) && (rotation < 2.4) || (rotation < -0.8) && (rotation > -2.4) ){
      //"Down";
      this.setVelocityX(0)
      this.setVelocityY(Math.sign(distanceY) * this.speed);
    }
      
      

      // this.handleBody()
      // if(cursors.left.isDown) {
      //   this.body.setVelocityX(-Math.sign(distanceX) * this.speed);
      //   this.setFlipX(false);
      // }
      // else if(cursors.right.isDown) {
      //   this.body.setVelocityX(Math.sign(distanceX) * this.speed);
      //   this.setFlipX(true);
      // }

      // if(cursors.up.isDown) {
      //   this.body.setVelocityY(-Math.sign(distanceY) * this.speed);
      // }
      // else if(cursors.down.isDown) {
      //   this.body.setVelocityY(Math.sign(distanceY) * this.speed); 
      // }
      // this.setW(0)
      // this.setY(0)
      // this.setRotation(rotation)
    } else {
      this.setVelocity(0)
    }
  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics()
    this.updateHealthBar()
  }

  updateHealth(health) {
    if (this.health <= 0) return;

    this.health = health;
    this.updateHealthBar();
  }

  updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0xffffff, 1);
    this.healthBar.fillRect(this.x + 18, this.y - 2, 64, 6);
    // creating a gradient rectangle
    this.healthBar.fillGradientStyle(0xf10a0a, 0xff0000, 4);
    this.healthBar.fillRect(this.x + 18, this.y - 2, 64 * (this.health / this.maxHealth), 6);
  }

  destroyMonster() {
    this.healthBar.clear();
    this.destroy()
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
  }
}

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)
    this.scene = scene; // the scene this container will be added to
    this.velocity = 160; // player velocity

    // this.anims.play({ key: 'down', repeat: -1 })
    // enable physics
    this.scene.physics.world.enable(this);
    // set immable if another object collides with our player
    this.setImmovable(false);
    // scale oyr player
    this.setScale(1.8);
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
         // this.anims.play('move_right', true);
         this.anims.play('down', true);
      } else {
        // this.anims.play('move_left', true);
        this.anims.play('down', true);
      }
    } else if (this.body.velocity.y !== 0) {
      if (this.body.velocity.y > 0) {
        // this.anims.play('move_down', true);
        this.anims.play('down', true);
      } else {
        // this.anims.play('move_up', true);
        this.anims.play('down', true);
        // this.anims.stop()
      }
    } else {
      this.anims.stop();
    }
  } 
  
  update(cursors) {
    this.handleAnimation();

    super.update
    {
      this.body.setVelocity(0);

      if(cursors.left.isDown) {
        this.body.setVelocityX(-this.velocity);
        this.setFlipX(false);
      }
      else if(cursors.right.isDown) {
        this.body.setVelocityX(this.velocity);
        this.setFlipX(true);
      }

      if(cursors.up.isDown) {
        this.body.setVelocityY(-this.velocity);
      }
      else if(cursors.down.isDown) {
        this.body.setVelocityY(this.velocity); 
      }
    };
  };
}
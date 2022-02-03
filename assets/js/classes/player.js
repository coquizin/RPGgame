class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)
    this.scene = scene; // the scene this container will be added to
    this.velocity = 160; // player velocity
    // this.anims = scene.anims

    // this.mageAnimation = this.scene.add.sprite(128, 128, 'mage_move_down').setScale(2)

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

    console.log(this)
    // this.mageAnimation.play({ key: 'mage_move_down', repeat: -1 });
    // this.anims.create({
    //   key: 'mage_moving_down',
    //   frames: this.anims.generateFrameNames('movingCorrect', { start: 0, end: 7, prefix: 'moving_down_100-', suffix: '.png'}),
    //   frameRate:15,
    //   repeat: -1
    // });

    console.log(this.anims)
    
    // have the caramera following the player
    this.scene.cameras.main.startFollow(this)
  }

  
  update(cursors) {
    super.update
    {
      this.body.setVelocity(0);

      if(cursors.left.isDown) {
        this.body.setVelocityX(-this.velocity);
      }
      else if(cursors.right.isDown) {
        this.body.setVelocityX(this.velocity);
      }

      if(cursors.up.isDown) {
        this.body.setVelocityY(-this.velocity);
      }
      else if(cursors.down.isDown) {
        this.body.setVelocityY(this.velocity); 
        // this.scene.moving_down.play({ key: 'mage_move_down', repeat: -1 });
        // this.anims.play('mage_moving_down')
      }
    };
  };
}
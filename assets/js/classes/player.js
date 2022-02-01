class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)
    this.scene = scene; // the scene this container will be added to
    this.velocity = 160; // player velocity

    // enable physics
    this.scene.physics.world.enable(this);
    // set immable if another object collides with our player
    this.setImmovable(false);
    // scale oyr player
    this.setScale(1.5);
    // colide with world bounds
    this.body.setCollideWorldBounds(true);
    // add the to our existing scene
    this.scene.add.existing(this);
  }

  update(cursors) {
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
    }
  };
}
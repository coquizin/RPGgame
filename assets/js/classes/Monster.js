class Monster extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, key, id, health, maxHealth) {
    super(scene, x, y, key);
    this.scene = scene;
    this.id = id;
    this.key = key;
    this.health = health;
    this.maxHealth = maxHealth;

    console.log(this.key)
    // enable physics
    this.scene.physics.world.enable(this);
  
    // scale our monster
    this.setScale(2);
    // colide with world bounds
    this.body.setCollideWorldBounds(true);
    // add the monster to our existing scene
    this.scene.add.existing(this);
  
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

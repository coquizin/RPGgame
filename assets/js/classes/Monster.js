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

    this.setOrigin(0)
  }

  update(x, y) {
    this.x = x;
    this.y = y;
    this.updateHealthBar();
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

import Phaser from 'phaser';

export default class Monster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, id, health, maxHealth, attack) {
    super(scene, x, y, key);
    this.scene = scene;
    this.id = id;
    this.key = key;
    this.x = x;
    this.y = y;
    this.health = health;
    this.maxHealth = maxHealth;
    this.range = 250;
    this.speed = 50;
    this.attack = attack;

    this.attacking = {
      on: false,
      x: 0,
      y: 0
    };

    this.lastDirection = `None`;
    this.lastTilePosition = { x: -1, y: -1 };

    this.lastAnimation = `rat_idle_down`;
    this.lastFlipX = undefined;

    this.anims.play({ key: `${key}_idle_down`, repeat: -1 }, true);
    // enable physics
    this.scene.physics.world.enable(this);

    this.setImmovable(true);
    // scale our monster
    this.setScale(2);
    // colide with world bounds
    this.body.setCollideWorldBounds(true);
    // add the monster to our existing scene
    this.scene.add.existing(this);

    this.createHealthBar();

    this.setOrigin(0.5, 0.5);
    this.setBodySize(30, 30);
  }

  setNormalHit() {
    this.setBodySize(30, 30);
  }

  setRangeHit() {
    this.setCircle(40);
    this.setOffset(-20, -20);
  }

  update(cursors, player, monster, monsters) {
    // console.log(monster.x, monster.y);
    this.updateHealthBar();
    this.startMovement(player, monster);
  }

  handleBody() {
    if (this.body.velocity.x !== 0) {
      if (this.body.velocity.x > 0) {
        this.anims.play('rat_move_side', true);
      } else {
        this.anims.play('rat_move_side', true);
      }
    } else if (this.body.velocity.y !== 0) {
      if (this.body.velocity.y > 0) {
        this.anims.play('rat_move_down', true);
      } else {
        this.anims.play('rat_move_up', true);
      }
    } else {
      this.setVelocity(0);
      this.anims.play({ key: `${this.key}_idle_down`, repeat: -1 }, true);
    }
  }

  startMovement(player, monster) {
    if (this.attacking.on) {
      this.setPosition(this.attacking.x, this.attacking.y);
      return;
    }

    this.x = monster.x;
    this.y = monster.y;

    const distanceX = player.x - this.x;
    const distanceY = player.y - this.y;

    // if (Math.abs(distanceX) < 200 && Math.abs(distanceY) < 200) {
    //   console.log('a');
    //   this.setRangeHit();
    // } else {
    //   this.setNormalHit();
    // }

    const rotation = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
    if (Math.abs(distanceX) < this.range || Math.abs(distanceY) < this.range) {
      // this.monsterAttack(player, monster);
      this.handleBody();
      if ((rotation >= 2.4 && rotation <= 4) || (rotation <= -2.4 && rotation >= -4)) {
        //"Left";
        this.setFlipX(true);
        // this.setVelocityY(0);
        this.setVelocityX(Math.sign(distanceX) * this.speed);
      } else if ((rotation >= 0 && rotation <= 0.8) || (rotation <= 0 && rotation >= -0.8)) {
        //"Right";
        this.setFlipX(false);
        // this.setVelocityY(0);
        this.setVelocityX(Math.sign(distanceX) * this.speed);
      } else if (rotation < -0.8 && rotation > -2.4) {
        // up
        // this.setVelocityX(0)
        this.setVelocityY(Math.sign(distanceY) * this.speed);
      } else if (rotation > 0.8 && rotation < 2.4) {
        //"Down";
        // this.setVelocityX(0)
        this.setVelocityY(Math.sign(distanceY) * this.speed);
      }
    } else {
      this.setVelocity(0);
      this.anims.play({ key: `${this.key}_idle_down`, repeat: -1 }, true);
    }
  }

  monsterAttack(player, monster) {
    const playerRect = new Phaser.Geom.Rectangle(player.x, player.y, 64, 64);
    const monsterRect = new Phaser.Geom.Rectangle(this.x, this.y, 64, 64);

    // if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, monsterRect)) {
    //   console.log('a');
    //   this.setVelocity(0);
    //   this.attacking = {
    //     on: true,
    //     x: this.x,
    //     y: this.y
    //   };

    //   this.anims.stop();
    //   this.anims.play('rat_attack_down', true);
    //   const payload = { player, monster };
    //   this.scene.events.emit('playerAttacked', payload);

    //   this.scene.time.delayedCall(500, () => {
    //     this.attacking.on = false;

    //     // this.startMovement(player, monster);
    //   });
    // }
    this.attacking = {
      on: true,
      x: this.x,
      y: this.y
    };

    this.anims.stop();
    this.anims.play('rat_attack_down', true);
    const payload = { player, monster };
    this.scene.events.emit('playerAttacked', payload);

    this.scene.time.delayedCall(500, () => {
      this.attacking.on = false;

      // this.startMovement(player, monster);
    });
  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  updateHealth(health) {
    if (this.health <= 0) return;

    this.health = health;
    this.updateHealthBar();
  }

  updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff_ff_ff, 1);
    this.healthBar.fillRect(this.x + 18, this.y - 2, 64, 6);
    // creating a gradient rectangle
    this.healthBar.fillGradientStyle(0xf1_0a_0a, 0xff_00_00, 4);
    this.healthBar.fillRect(this.x + 18, this.y - 2, 64 * (this.health / this.maxHealth), 6);
  }

  destroyMonster() {
    this.healthBar.clear();
    this.destroy();
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

import Phaser from 'phaser';
import MagicModel from '../models/MagicModel';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, health, maxHealth, maxMana, mana) {
    super(scene, x, y, key);
    this.scene = scene; // the scene this container will be added to
    this.x = x;
    this.y = y;
    this.velocity = 990; // player velocity
    this.health = health;
    this.maxHealth = maxHealth;
    this.maxMana = maxMana;
    this.mana = mana;
    this.magicRunning = false;
    this.stopMoving = false;
    this.playerObject = undefined;

    this.selectedMagic = 'water';
    this.selectedBag = '';

    this.loaded = false;

    this.interval = undefined;

    this.anims.play(`mage_spawn`).anims.chain({ key: `idle_down`, repeat: -1 });

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      (animation) => {
        switch (animation.key) {
          case 'mage_spawn':
            this.loaded = true;
            break;
          case 'mage_death':
            this.health = this.maxHealth;
            this.setPosition(this.playerObject.x, this.playerObject.y);

            this.scene.events.emit('playerBarRespawn');

            this.playerObject = undefined;
            this.loaded = false;
            this.lastAnimation = `idle_down`;
            this.lastFlipX = undefined;

            this.anims.play(`mage_spawn`, true);
            this.setImmovable(false);
            break;
        }
      },
      this
    );

    this.lastAnimation = `idle_down`;
    this.lastFlipX = undefined;

    this.scene.events.on('magic_collision', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
    });

    this.scene.events.on('changeMagics', (magicSelected) => {
      this.selectedMagic = magicSelected;
    });

    this.scene.events.on('playerHealth', (hp) => {
      if (this.health < 100) {
        if (this.health + hp > 100) {
          this.health = 100;
        } else {
          this.health += hp;
        }
      }
    });

    // this.anims.play({ key: 'down', repeat: -1 })
    // enable physics
    this.scene.physics.world.enable(this);
    // set immable if another object collides with our player
    this.setImmovable(false);
    // scale oyr player
    this.setScale(2);

    this.setSize(36);
    // colide with world bounds
    this.body.setCollideWorldBounds(true);
    // add the to our existing scene
    this.scene.add.existing(this);
    // have the caramera following the player
    this.scene.cameras.main.startFollow(this);

    // this.createHealthBar();
  }

  setMagics(magics) {
    this.magics = magics;
  }

  throwMagic(name) {
    console.log(this.mana);
    if (!this.magics) return;
    if (this.magicRunning) return;

    this.magicRunning = true;
    this.stopMoving = true;
    this.body.setVelocity(0);
    const {
      key,
      // damage,
      speed,
      delay,
      cooldown,
      x,
      y,
      vector,
      animation,
      magicAnimation,
      maxDistance,
      manaCost
    } = new MagicModel(name, this.x, this.y, this.lastAnimation, this.lastFlipX).get();
    if (this.mana <= manaCost) {
      this.magicRunning = false;
      this.stopMoving = false;
      return;
    }
    const magic = this.magics.get(x, y, key);
    magic.setName(this.selectedMagic);

    if (!magic) return;

    magic.setActive(false);
    magic.setVisible(false);

    this.anims.play(animation, true);

    this.scene.time.delayedCall(
      delay,
      () => {
        const vec = new Phaser.Math.Vector2(vector.x, vector.y);

        magic.setVelocity(vec.x * speed, vec.y * speed);
        magic.setScale(2);
        magic.setSize(20, 18, true);
        magic.setFlipX(!this.lastFlipX);

        magic.setActive(true);
        magic.setVisible(true);

        magic.anims.play({ key: magicAnimation, repeat: -1 }, true);

        // mana decreased
        this.scene.events.emit('playerWasteManaBar', manaCost);
        this.mana -= manaCost;

        this.stopMoving = false;
        this.scene.time.delayedCall(cooldown - delay, () => {
          this.magicRunning = false;
          this.anims.stop();
        });
      },
      [],
      this
    );

    this.interval = setInterval(() => {
      switch (this.lastAnimation) {
        case 'idle_up':
          if (maxDistance > magic.y) {
            magic.destroy();
            clearInterval(this.interval);
          }
          break;
        case 'idle_down':
          if (maxDistance < magic.y) {
            magic.destroy();
            clearInterval(this.interval);
          }
          break;
        case 'idle_side':
          if (this.lastFlipX) {
            if (maxDistance > magic.x) {
              magic.destroy();
              clearInterval(this.interval);
            }
          } else {
            if (maxDistance < magic.x) {
              magic.destroy();
              clearInterval(this.interval);
            }
          }
          break;
      }
    }, 100);
  }

  updateHealth(health) {
    if (this.health <= 0) return;
    this.health = health;
    this.scene.events.emit('playerDamageHealthBar', health);
  }

  handleBody() {
    if (this.body.velocity.x !== 0) {
      if (this.body.velocity.x > 0) {
        this.anims.play('move_side', true);
        this.lastFlipX = false;
      } else {
        this.anims.play('move_side', true);
        this.lastFlipX = true;
      }

      this.lastAnimation = `idle_side`;
    } else if (this.body.velocity.y !== 0) {
      if (this.body.velocity.y > 0) {
        this.anims.play('move_down', true);
        this.lastAnimation = `idle_down`;
      } else {
        this.anims.play('move_up', true);
        this.lastAnimation = `idle_up`;
      }
    } else {
      if (this.anims.isPlaying) return;

      if (this.body.velocity.x === 0 && this.body.velocity.y === 0 && !this.anims.isPlaying) {
        this.anims.play({ key: this.lastAnimation, repeat: -1 }, true);
        this.setFlipX(this.lastFlipX);
      } else {
        this.anims.play({ key: this.lastAnimation, repeat: -1 }, true);
        this.setFlipX(this.lastFlipX);
      }
    }
  }

  respawn(playerObject) {
    this.loaded = false;
    this.body.setVelocity(0);
    this.setImmovable();
    this.playerObject = playerObject;
    this.anims.play('mage_death', true);
  }

  update(cursors) {
    if (!this.loaded) return;
    if (this.stopMoving) return;
    this.handleBody();

    super.update;
    {
      this.body.setVelocity(0);

      if (cursors.left.isDown) {
        this.body.setVelocityX(-this.velocity);
        this.setFlipX(true);
      } else if (cursors.right.isDown) {
        this.body.setVelocityX(this.velocity);
        this.setFlipX(false);
        this.lastFlipX = false;
      }

      if (cursors.up.isDown) {
        this.body.setVelocityY(-this.velocity);
      } else if (cursors.down.isDown) {
        this.body.setVelocityY(this.velocity);
      }
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.throwMagic(this.selectedMagic);
      return;
    }
  }
}

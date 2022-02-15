export default class MagicModel {
  constructor(name, x, y, playerAnimation, flip) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.playerAnimation = playerAnimation;
    this.flip = flip;
    this.vector = {
      x: 0,
      y: 0
    };
    this.animation = ``;

    switch (this.name) {
      case `water`:
        this.key = `water_magic`;
        this.damage = 10;
        this.speed = 1000;
        this.cooldown = 400;
        this.delay = 450;
        this.distance = 48 * 10; // 10 eh o sqm/bloco
        this.manaCost = 11;
        break;
      case `fire`:
        this.key = `fire_magic`;
        this.damage = 30;
        this.speed = 150;
        this.cooldown = 500;
        this.delay = 450;
        this.distance = 48 * 100;
        this.manaCost = 1;
        break;
      case `dark`:
        this.key = `dark_magic`;
        this.damage = 100;
        this.speed = 150;
        this.cooldown = 500;
        this.delay = 500;
        this.distance = 48 * 100;
        this.manaCost = 25;
        break;
    }

    this.setPosition();
  }

  setPosition() {
    switch (this.playerAnimation) {
      case 'idle_up':
        this.vector.y = -1;
        this.animation = `${this.name}Attack_up`;
        this.y = this.y - 0;
        this.magicAnimation = `${this.name}Magic_up`;
        this.maxDistance = this.y - this.distance;
        break;
      case 'idle_down':
        this.vector.y = 1;
        this.animation = `${this.name}Attack_down`;
        this.y = this.y + 0;
        this.magicAnimation = `${this.name}Magic_down`;
        this.maxDistance = this.y + this.distance;
        break;
      case 'idle_side':
        if (this.flip) {
          this.vector.x = -1;
          this.animation = `${this.name}Attack_side`;
          this.x = this.x - 0;
          this.magicAnimation = `${this.name}Magic_side`;
          this.maxDistance = this.x - this.distance;
        } else {
          this.vector.x = 1;
          this.animation = `${this.name}Attack_side`;
          this.x = this.x + 0;
          this.magicAnimation = `${this.name}Magic_side`;
          this.maxDistance = this.x + this.distance;
        }
        break;
    }
  }

  get() {
    return {
      key: this.key,
      damage: this.damage,
      speed: this.speed,
      cooldown: this.cooldown,
      x: this.x,
      y: this.y,
      delay: this.delay,
      vector: this.vector,
      animation: this.animation,
      magicAnimation: this.magicAnimation,
      distance: this.distance,
      maxDistance: this.maxDistance,
      manaCost: this.manaCost
    };
  }
}

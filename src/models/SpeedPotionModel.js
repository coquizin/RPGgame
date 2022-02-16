export default class SpeedPotionModel {
  constructor(name) {
    this.name = name;

    switch (this.name) {
      case `small_speed_potion`:
        this.speed = 10;
        break;
      case `large_speed_potion`:
        this.speed = 25;
        break;
      case `great_speed_potion`:
        this.speed = 50;
        break;
      case `ultimate_speed_potion`:
        this.speed = 100;
        break;
    }
  }

  get() {
    return {
      speed: this.speed
    };
  }
}

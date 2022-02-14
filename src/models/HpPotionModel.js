export default class HpPotionModel {
  constructor(name) {
    this.name = name;

    switch (this.name) {
      case `small_hp_potion`:
        this.hp = 10;
        break;
      case `large_hp_potion`:
        this.hp = 25;
        break;
      case `great_hp_potion`:
        this.hp = 50;
        break;
      case `ultimate_hp_potion`:
        this.hp = 100;
        break;
    }
  }

  get() {
    return {
      hp: this.hp
    };
  }
}

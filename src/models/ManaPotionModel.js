export default class ManaPotionModel {
  constructor(name) {
    this.name = name;

    switch (this.name) {
      case `small_mana_potion`:
        this.mana = 10;
        break;
      case `large_mana_potion`:
        this.mana = 25;
        break;
      case `great_mana_potion`:
        this.mana = 50;
        break;
      case `ultimate_mana_potion`:
        this.mana = 100;
        break;
    }
  }

  get() {
    return {
      mana: this.mana
    };
  }
}

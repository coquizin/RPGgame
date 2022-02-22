export default class intensModel {
  constructor(id) {
    this.id = id;

    switch (this.id) {
      case 1:
        this.price = 10;
        this.key = 'sword_1';
        break;
      case 2:
        this.price = 30;
        this.key = 'sword_2';
        break;
      case 3:
        this.price = 80;
        this.key = 'sword_3';
        break;
    }
  }
}

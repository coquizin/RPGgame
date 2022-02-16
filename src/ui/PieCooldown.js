import Phaser from 'phaser';

export default class PieCooldown {
  constructor(scene, x, y) {
    this.pie = new Phaser.GameObjects.Graphics(scene);
    this.pie.setScrollFactor(0, 0);
    this.pie.setDepth(10);
    this.name = name;
    this.x = x;
    this.y = y;
    this.p = 120 / 100;

    scene.add.existing(this.pie);
  }
}

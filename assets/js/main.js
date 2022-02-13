var config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 840,
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      },
    }
  },
  pixelArt: true,
  roundPixels: true
};


var game = new Phaser.Game(config);

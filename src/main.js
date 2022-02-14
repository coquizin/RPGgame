import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import TitleScene from './scenes/TitleScene'
import UiScene from './scenes/UiScene'
import GameScene from './scenes/GameScene'

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 840,
  scene: [
    BootScene,
    TitleScene,
    UiScene,
    GameScene,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    }
  },
  pixelArt: true,
  roundPixels: true
};

export default new Phaser.Game(config)
import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // load images
    this.loadImages();
    // load spritesheets
    this.loadSpriteSheets();
    //load autio
    this.loadAudio();
    // load tile map
    this.loadTileMap();
    // load animation mage
    this.load.aseprite("mage", 'assets/images/character/player/mage_idle.png' ,"assets/images/character/player/mage_idle.json")
    // load magic animation
    this.load.aseprite('water_magic', 'assets/images/character/player/attacks/water_magic/water_magic.png', 'assets/images/character/player/attacks/water_magic/water_magic.json')
    // load enemy
    this.load.aseprite('carrot', 'assets/images/enemies/carrot_char.png', 'assets/images/enemies/carrot_char.json')
  }

  loadImages() {
    // load start ui images
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
   
    // load the cave tileset image
    this.load.image('tilesets_1', `assets/images/caves/tilesets_1.png`);
    this.load.image('cave_1', 'assets/images/caves/cave_1.png');
    this.load.image('cave_2', 'assets/images/caves/cave_2.png');
  }

  loadSpriteSheets() {
    // load spritesheets
    this.load.spritesheet('items', 'assets/images/tilesets/items.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  loadAudio() {
   //load autio
   this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
  }

  loadTileMap() {
    // map with tiled in JSON form
    this.load.tilemapTiledJSON('cave', 'assets/images/maps/cave_farm.json');
  }

  loadAnimations() {
    this.anims.createFromAseprite("mage");
    this.anims.createFromAseprite("water_magic");
    this.anims.createFromAseprite("carrot");
  }

  create() {
    // console.log('starting game');
    this.loadAnimations();
    this.scene.start('Game');
  }
}
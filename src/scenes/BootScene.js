import Phaser from 'phaser';

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
    this.load.aseprite(
      'mage',
      'assets/images/character/player/mage_idle.png',
      'assets/images/character/player/mage_idle.json'
    );
    // load magic animation
    this.load.aseprite(
      'water_magic',
      'assets/images/character/player/attacks/water_magic/water_magic.png',
      'assets/images/character/player/attacks/water_magic/water_magic.json'
    );
    this.load.aseprite(
      'fire_magic',
      'assets/images/character/player/attacks/fire_magic/fire_magic.png',
      'assets/images/character/player/attacks/fire_magic/fire_magic.json'
    );
    this.load.aseprite(
      'dark_magic',
      'assets/images/character/player/attacks/dark_magic/dark_magic.png',
      'assets/images/character/player/attacks/dark_magic/dark_magic.json'
    );
    // load enemy carrot
    this.load.aseprite(
      'carrot',
      'assets/images/enemies/carrot_char.png',
      'assets/images/enemies/carrot_char.json'
    );
    // load enemy rat
    this.load.aseprite('rat', 'assets/images/enemies/rat.png', 'assets/images/enemies/rat.json');
    // load quick bar
    this.load.aseprite(
      'quick_bar',
      'assets/images/ui/quickBar.png',
      'assets/images/ui/quickBar.json'
    );
  }

  loadImages() {
    // load start ui images
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');

    this.load.image('iventory', 'assets/images/ui/inventory.png');
    // this.load.image('Quick_tool', 'assets/images/ui/Quick_tool.png');
    this.load.image('moldura', 'assets/images/ui/moldura.png');

    // load the cave tileset image
    this.load.image('fullTiles', `assets/images/tilesets/fullTiles.png`);
    this.load.image('collision', 'assets/images/tilesets/collision.png');

    //UI button of quick toll
    this.load.image('potion', 'assets/images/ui/potion.png');

    this.load.image('bag', 'assets/images/ui/Bagpack.png');

    this.load.image('select_ui', 'assets/images/ui/select_ui.png');
    this.load.image('water_magic_button', 'assets/images/ui/water_magic_button.png');

    // load coins
    this.load.image('coin', 'assets/images/ui/coin.png');
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
    this.anims.createFromAseprite('mage');
    this.anims.createFromAseprite('water_magic');
    this.anims.createFromAseprite('dark_magic');
    this.anims.createFromAseprite('fire_magic');
    this.anims.createFromAseprite('carrot');
    this.anims.createFromAseprite('rat');
    this.anims.createFromAseprite('quick_bar');
  }

  create() {
    console.log('starting game');

    this.loadAnimations();

    this.scene.start('Game');
  }
}

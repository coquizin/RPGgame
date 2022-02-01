class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  };

  preload() {
    // load images
    this.loadImages();
    // load spritesheets
    this.loadSpriteSheets();
    //load autio
    this.loadAudio();
    // load tile map
    this.loadTileMap();
  };

  loadImages() {
    // load images
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    // load the map tileset image
    this.load.image('tilesetCerto', 'assets/images/tilesetCerto.png');
  }

  loadSpriteSheets() {
    // load spritesheets
    this.load.spritesheet('items', 'assets/images/items.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('characters', 'assets/images/characters.png', {
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
    this.load.tilemapTiledJSON('map', 'assets/images/rpgMap.json');
  };

  create() {
    console.log('starting game');
    this.scene.start('Game');
  };
};
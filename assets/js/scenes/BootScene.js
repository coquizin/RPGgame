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
    this.load.image('chao2', `assets/images/tilesets_1.png`);
    this.load.image('agua1', `assets/images/tilesets_2.png`);
    this.load.image('chao3', `assets/images/tilesets_3.png`);
    this.load.image('chao1', `assets/images/tilesets_4.png`);
    this.load.image('agua2', `assets/images/tilesets_5.png`);
    this.load.image('arvore', `assets/images/tilesets_6.png`);
    this.load.image('flores', `assets/images/tilesets_7.png`);
    this.load.image('town', `assets/images/tilesets_8.png`);
    this.load.image('town_2', `assets/images/tilesets_9.png`);
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
    this.load.tilemapTiledJSON('map', 'assets/images/rpgteste.json');
  };

  create() {
    console.log('starting game');
    this.scene.start('Game');
  };
};
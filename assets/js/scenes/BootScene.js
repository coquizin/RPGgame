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
    // load animation mage
    this.load.aseprite("mage", 'assets/images/character/player/mage_idle.png' ,"assets/images/character/player/mage_idle.json")
    // load magic animation
    this.load.aseprite('water_magic', 'assets/images/character/player/attacks/water_magic/water_magic.png', 'assets/images/character/player/attacks/water_magic/water_magic.json')
  };

  loadImages() {
    // load start ui images
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');




  
    this.load.image('Iventory', 'assets/images/ui/inventory.png');
    this.load.image('Quick_tool', 'assets/images/ui/Quick_tool.png');
    this.load.image('moldura', 'assets/images/ui/moldura.png');

    this.load.image('heartFull', 'assets/images/ui/heartFull.png');
    this.load.image('heartEmpyt', 'assets/images/ui/heartEmpyt.png');


   
    // load the cave tileset image
    this.load.image('fullTiles', `assets/images/tilesets/fullTiles.png`);
    this.load.image('cave_1', 'assets/images/caves/cave_1.png');
    this.load.image('cave_2', 'assets/images/caves/cave_2.png');

    // pinto

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
  };

  loadAnimations() {
    this.anims.createFromAseprite("mage");
    this.anims.createFromAseprite("water_magic");
  };

  create() {
    console.log('starting game');

    this.loadAnimations();

    
    this.scene.start('Game');
  };
};
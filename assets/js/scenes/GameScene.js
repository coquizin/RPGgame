class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  
  init() {
    this.scene.launch('Ui');
    this.score = 0;
  };

  create() {
    this.createMap();

    this.blob = this.add.sprite(300, 300, 'blob')
    // this.blob.play({ key: 'down', repeat: -1 })
    this.createAudio();
    this.createChests();
    
    // this.moving_down = this.add.sprite(128, 128, 'movingCorrect', "moving_down_100-1.png").setScale(2)
    // this.moving_down = this.add.sprite(128, 128, 'mage_move_down').setScale(2)
   

    // this.anims.create({
    //   key: 'mage_moving_down',
    //   frames: this.anims.generateFrameNames('movingCorrect', { start: 0, end: 7, prefix: 'moving_down_100-', suffix: '.png'}),
    //   frameRate:15,
    //   repeat: -1
    // });

    // this.moving_down.anims.play('mage_moving_down')
    

    this.createPlayer();
    this.addCollision();
    this.createInput();


  
  };

  update() {
    this.player.update(this.cursors);
  };

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.2})
  }

  createPlayer() {
    this.player = new Player(this, 320, 32, 'mage_move_down');
    
  }

  createChests() {
    // create a chest group
    this.chests = this.physics.add.group();
    // create chest positions array
    this.chestPosition = [[100, 100], [200, 200], [300, 300], [400, 400], [500, 500]];
    // specify the max number of chest we can have
    this.maxNumberOfChests = 3;
    // spawn a chest
    for (let i = 0; i < this.maxNumberOfChests; i++) {
      this.spawnChest();
    };
  }


  spawnChest() {
    const location = this.chestPosition[Math.floor(Math.random() * this.chestPosition.length)]

    let chest = this.chests.getFirstDead();
    if(!chest) {
      const chest = new Chest(this, location[0], location[1], 'items', 0);
      //add chest to chests group
      this.chests.add(chest);
    } 
    else {
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    };
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  addCollision() {
    //  colisao
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.collider(this.player, this.waterLayer);
    this.physics.add.collider(this.player, this.objectsLayer);
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    this.physics.add.collider(this.player, this.objectsLayer);
    this.physics.add.collider(this.player, this.deepCaveLayer);
  }


  collectChest(player, chest) {
    // play sound
    this.goldPickupAudio.play();
    // update our score
    this.score += chest.coins;
    // update scores
    this.events.emit('updateScore', this.score)
    // make chest game Object inactive
    chest.makeInactive();
    // spawn a new chest
    this.time.delayedCall(1000, this.spawnChest, [], this);
  }

  createMap() {
    // create the tile map
    this.map = this.make.tilemap({ key: 'map' })
    // add the tileset image to our map

    // this.map.addTilesetImage('chao2');
    // this.waterTile = this.map.addTilesetImage('agua1');
    // this.waterLayer = this.map.createLayer('agua', this.waterTile).setScale(2);

    
    const titles = []
    // titles.push(this.map.addTilesetImage('chao1'));
    titles.push(this.map.addTilesetImage('tilesets_1'));
    // titles.push(this.map.addTilesetImage('chao3'));
    // titles.push(this.map.addTilesetImage('agua1'));
    // titles.push(this.map.addTilesetImage('agua2'));
    // titles.push(this.map.addTilesetImage('arvore'));
    // titles.push(this.map.addTilesetImage('flores'));
    // titles.push(this.map.addTilesetImage('town'));
    // titles.push(this.map.addTilesetImage('town_2'));
    titles.push(this.map.addTilesetImage('cave_1'));
    titles.push(this.map.addTilesetImage('cave_2'));


    // const tilesBackground = []
    // tilesBackground.push(this.map.addTilesetImage('chao1'));
    // tilesBackground.push(this.map.addTilesetImage('chao2'));
    // tilesBackground.push(this.map.addTilesetImage('chao3'));

    // const tilesWater = []
    // tilesWater.push(this.map.addTilesetImage('agua1'));
    // tilesWater.push(this.map.addTilesetImage('agua2'));

    // const titleObject = []
    // titleObject.push(this.map.addTilesetImage('arvore'));
    // titleObject.push(this.map.addTilesetImage('flores'));
    // titleObject.push(this.map.addTilesetImage('town'));
    // titleObject.push(this.map.addTilesetImage('town_2'));

    // const backgroundLayer = this.map.createDynamicLayer('background', tilesBackground, 0, 0);
    // const groundLayer = this.map.createDynamicLayer('chao', tilesBackground, 0, 0);
    // const waterLayer = this.map.createDynamicLayer('agua', tilesWater, 0, 0);
    // const objectLayer = this.map.createDynamicLayer('objetos', titleObject, 0, 0);


    this.backgroundLayer = this.map.createLayer('background_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
    this.deepCaveLayer = this.map.createLayer('deep_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
    this.groundLayer = this.map.createLayer('ground_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
    this.objectsLayer = this.map.createLayer('objects_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
    // const backgroundLayer = this.map.createLayer('background', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
    // const waterLayer = this.map.createLayer('agua', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
    // const groundLayer = this.map.createLayer('chao', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
    // const objectLayer = this.map.createLayer('objetos', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);

    // declare the collisions
    // platformLayer.setCollisionByProperty({ collides: true });

    // this.tiles = this.ma);.addTilesetImage('tilesetCerto', 'tilesetCerto',16, 16, 0, 0)


    

    // this.tiles = this.map.createDynamicLayer(`map`, layers, 0, 0)
    //create our background
    // this.backgroundLayer = this.map.createLayer('Ground', this.tiles).setScale(2);
    // this.objectsLayer = this.map.createLayer('objects', this.tiles).setScale(2);

    // this.waterLayer.setCollisionByProperty({collides : true})
    // this.objectsLayer.setCollisionByProperty({collides : true})

    // debug collider
    // const debugGraphics = this.add.graphics().setAlpha(0.7)
    // this.objectsLayer.renderDebug(debugGraphics, {
    //   titleColor: null,
    //   colldingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })

    // const debugGraphics = this.add.graphics().setAlpha(0.7)
    // this.objectsLayer.renderDebug(debugGraphics, {
    //   titleColor: null,
    //   colldingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })

    //update the world bounds
    this.physics.world.bounds.width = this.map.widthInPixels * 2;
    this.physics.world.bounds.height = this.map.heightInPixels * 2;

    // // limit the camera to the size of our map
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);

  }
}
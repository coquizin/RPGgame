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
    this.createAudio();
    this.createChests();
    this.createMagics();
    this.createPlayer();
    this.addCollision();
    this.createInput();
    
    console.log(`update`)
  };

  update() {
    this.player.update(this.cursors);
    // colisao das magias
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.2})
  }

  createMagics(){
    this.magics = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
    });
  }

  createPlayer() {
    this.player = new Player(this, 320, 32, 'mage', null);
    this.player.setMagics(this.magics)
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
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    this.physics.add.collider(this.player, this.objectsLayer);
    this.physics.add.collider(this.player, this.deepCaveLayer);
    

    this.physics.add.collider(this.magics, this.objectsLayer, this.handleMagicCollision, undefined, this);
    this.physics.add.collider(this.magics, this.deepCaveLayer, this.handleMagicCollision, undefined, this);
  }

  handleMagicCollision(obj1) {
    this.magics.killAndHide(obj1)
    this.events.emit('magic_collision', obj1)
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
    this.map = this.make.tilemap({ key: 'cave' })
    // add the tileset image to our map

    // this.map.addTilesetImage('chao2');
    // this.waterTile = this.map.addTilesetImage('agua1');
    // this.waterLayer = this.map.createLayer('agua', this.waterTile).setScale(2);

    
    const titles = []
    // titles.push(this.map.addTilesetImage('tilesets_1'));
    titles.push(this.map.addTilesetImage('cave_1'));
    titles.push(this.map.addTilesetImage('cave_2'));


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
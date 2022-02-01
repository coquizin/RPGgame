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
    this.player= new Player(this, 32, 32, 'characters', 0);
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
    this.map = this.make.tilemap({key: 'map'})
    // add the tileset image to our map
    this.tiles = this.map.addTilesetImage('tilesetCerto', 'tilesetCerto',16, 16, 0, 0)
    //create our background
    this.backgroundLayer = this.map.createLayer('Ground', this.tiles).setScale(2);
    this.waterLayer = this.map.createLayer('water', this.tiles).setScale(2);
    this.objectsLayer = this.map.createLayer('objects', this.tiles).setScale(2);

    this.waterLayer.setCollisionByProperty({collides : true})
    this.objectsLayer.setCollisionByProperty({collides : true})

    //debug collider
    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.waterLayer.renderDebug(debugGraphics, {
      titleColor: null,
      colldingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    })

    // const debugGraphics = this.add.graphics().setAlpha(0.7)
    // this.objectsLayer.renderDebug(debugGraphics, {
    //   titleColor: null,
    //   colldingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })

  }
}
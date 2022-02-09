// class Map {
//   constructor(scene) {
//     this.scene = scene;
    
//     this.createMap();
//   }

//   createMap() {
//     // create the tile map
//     this.map = this.scene.make.tilemap({ key: 'cave' })
//     // add the tileset image to our map

//     // this.map.addTilesetImage('chao2');
//     // this.waterTile = this.map.addTilesetImage('agua1');
//     // this.waterLayer = this.map.createLayer('agua', this.waterTile).setScale(2);

    
//     const titles = []
//     // titles.push(this.map.addTilesetImage('tilesets_1'));
//     titles.push(this.map.addTilesetImage('cave_1'));
//     titles.push(this.map.addTilesetImage('cave_2'));


//     // const backgroundLayer = this.map.createDynamicLayer('background', tilesBackground, 0, 0);
//     // const groundLayer = this.map.createDynamicLayer('chao', tilesBackground, 0, 0);
//     // const waterLayer = this.map.createDynamicLayer('agua', tilesWater, 0, 0);
//     // const objectLayer = this.map.createDynamicLayer('objetos', titleObject, 0, 0);


//     this.backgroundLayer = this.map.createLayer('background_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
//     this.deepCaveLayer = this.map.createLayer('deep_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
//     this.groundLayer = this.map.createLayer('ground_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
//     this.objectsLayer = this.map.createLayer('objects_cave', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
//     // const backgroundLayer = this.map.createLayer('background', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
//     // const waterLayer = this.map.createLayer('agua', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
//     // const groundLayer = this.map.createLayer('chao', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);
//     // const objectLayer = this.map.createLayer('objetos', titles, 0, 0).setCollisionByProperty({ collides: true }).setScale(2);

//     // declare the collisions
//     // platformLayer.setCollisionByProperty({ collides: true });

//     // this.tiles = this.ma);.addTilesetImage('tilesetCerto', 'tilesetCerto',16, 16, 0, 0)


    

//     // this.tiles = this.map.createDynamicLayer(`map`, layers, 0, 0)
//     //create our background
//     // this.backgroundLayer = this.map.createLayer('Ground', this.tiles).setScale(2);
//     // this.objectsLayer = this.map.createLayer('objects', this.tiles).setScale(2);

//     // this.waterLayer.setCollisionByProperty({collides : true})
//     // this.objectsLayer.setCollisionByProperty({collides : true})

//     // debug collider
//     // const debugGraphics = this.add.graphics().setAlpha(0.7)
//     // this.objectsLayer.renderDebug(debugGraphics, {
//     //   titleColor: null,
//     //   colldingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
//     //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
//     // })

//     // const debugGraphics = this.add.graphics().setAlpha(0.7)
//     // this.objectsLayer.renderDebug(debugGraphics, {
//     //   titleColor: null,
//     //   colldingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
//     //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
//     // })

//     //update the world bounds
//     this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
//     this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;

//     // // limit the camera to the size of our map
//     this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);

//   }
// }
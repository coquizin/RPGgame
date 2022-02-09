class Spawner {
  constructor(config, spawnLocations, addObject, deleteObject, numberMonster) {
    this.id = config.id;
    this.spawnInterval = config.spawnInterval;
    this.limit = config.limit;
    this.objectType = config.spawnerType;
    this.spawnLocation = spawnLocations;
    this.addObject = addObject;
    this.deleteObject = deleteObject;
    this.numberMonster = numberMonster;

    this.objectsCreated = [];

    this.start();
  }

  start() {
    this.interval = setInterval(() => {
      if (this.objectsCreated.length < this.limit) {
        this.spawnObject()
      }
    }, this.spawnInterval);
  }

  spawnObject() {
    if (this.objectType === 'MONSTER') {
      this.spawnMonster();
    }
  }

  spawnMonster() {
   
    let monster = new MonsterModel(this.spawnLocation.x, this.spawnLocation.y, 10, this.id, 100, 10);
    this.objectsCreated.push(monster);
    this.addObject(monster.id, monster);
    
  }

  removeObject(id) {
    this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id);
    this.deleteObject(id);
  }

}
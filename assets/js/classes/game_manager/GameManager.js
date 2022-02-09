class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.monsters = {};

    this.playerLocation = {};
    this.monsterLocation = [];
  }

  setup() {
    this.parseMapData();
    this.setupEventListener();
    this.setupSpawners();
    this.spawnPlayer();
  }

  parseMapData() {
    // console.log(this.mapData);
    this.mapData.forEach((layer) => {
      if (layer.name === 'player_spawn') {
        layer.objects.forEach((obj) => {
          this.playerLocation = {x: obj.x * 2, y: obj.y * 2}
        });
      } else if (layer.name === 'monster_spawn') {
        layer.objects.forEach((obj, idx) =>{
          this.monsterLocation[idx]= {x: obj.x, y: obj.y}
        })
      }
    })
    // console.log(this.monsterLocation)
  }

  setupEventListener() {

  }

  setupSpawners() {
    let spawner;
    const config = {
      spawnInterval: 0,
      limit: 1,
      spawnerType: '', 
      id: '',
    }
    Object.keys(this.monsterLocation).forEach((key) => {
      config.id = `monster-${key}`;
      config.spawnerType = 'MONSTER';
      spawner = new Spawner(
        config,
        this.monsterLocation[key],
        this.addMonster.bind(this),
        this.deleteMonster.bind(this),
        this.monsterLocation.length
      );
      this.spawners[spawner.id] = spawner;
    });
  }

  spawnPlayer() {
    this.scene.events.emit('spawnPlayer', this.playerLocation);
  }

  addMonster(monsterId, monster) {
    this.monsters[monsterId] = monster;
    this.scene.events.emit('monsterSpawn', monster)
  }

  deleteMonster(monsterId) {
    delete this.monsters[monsterId]
  }
}
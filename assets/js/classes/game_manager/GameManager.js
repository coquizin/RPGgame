class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.monsters = {};

    this.playerLocation = {};
    // AAA
    this.monsterLocation = {};
  }

  setup() {
    this.parseMapData();
    this.setupEventListener();
    this.setupSpawners();
    this.spawnPlayer();
  }

  parseMapData() {
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
  }

  setupEventListener() {
    this.scene.events.on('monsterAttacked', (monster) => { 
      if (this.monsters[monster.id]) {
        this.monsters[monster.id].loseHealth()
        monster.updateHealth(this.monsters[monster.id].health)
        // check monster health
        if (this.monsters[monster.id].health <= 0) {
          this.deleteMonster(monster.id)
          this.scene.events.emit('monsterRemoved', monster.id)
        }
      }
    })
  }

  setupSpawners() {
    this.monstersSpawners()

    this.timedEvent = this.scene.time.addEvent({ delay: 15000, callback: this.monstersSpawners, callbackScope: this, loop: true });
  }

  monstersSpawners() {
    Object.keys(this.monsterLocation).forEach((key) => {
      let monsterDead = true;
      Object.keys(this.monsters).forEach((monster) => {
        if (this.monsters[monster].id === `monster-${key}`) {
          monsterDead = false
        }
      })

      if (monsterDead) {
        let monster = new MonsterModel(
          this.monsterLocation[key].x, 
          this.monsterLocation[key].y, 
          10, 
          `monster-${key}`, 
          100, 
          10
        );

        this.addMonster(monster)
      }
    });
  }

  spawnPlayer() {
    this.scene.events.emit('spawnPlayer', this.playerLocation);
  }

  addMonster(monster) {
    this.monsters[monster.id] = monster;
    this.scene.events.emit('monsterSpawn', monster)
  }

  deleteMonster(monsterId) {
    delete this.monsters[monsterId]
  }
}
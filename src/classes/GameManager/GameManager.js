import MagicModel from '../../models/MagicModel';
import MonsterModel from '../../models/MonsterModel';
import PlayerModel from '../../models/PlayerModel';

export default class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.monsters = {};
    this.player = undefined;

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
    for (const layer of this.mapData) {
      if (layer.name === 'player_spawn') {
        for (const object of layer.objects) {
          this.playerLocation = { x: object.x * 2, y: object.y * 2 };
        }
      } else if (layer.name === 'monster_spawn') {
        for (const [index, object] of layer.objects.entries()) {
          this.monsterLocation[index] = { x: object.x, y: object.y };
        }
      }
    }
  }

  setupEventListener() {
    this.scene.events.on('monsterAttacked', ({ magic, monster }) => {
      const { damage } = new MagicModel(magic.name).get();

      if (this.monsters[monster.id]) {
        this.monsters[monster.id].loseHealth(damage);
        monster.updateHealth(this.monsters[monster.id].health);
        // check monster health
        if (this.monsters[monster.id].health <= 0) {
          this.deleteMonster(monster.id);
          this.scene.events.emit('monsterRemoved', monster.id);
          //TODO: rewards from monsters
        }
      }
    });

    this.scene.events.on('playerAttacked', ({ player, monster }) => {
      if (this.player) {
        // player lose Health
        this.player.loseHealth(monster.damage);
        player.updateHealth(this.player.health);

        // player dies
        if (this.player.health <= 0) {
          this.player.respawn();
          this.scene.events.emit('respawnPlayer', this.player);

          // respawn monsters after player die
          setTimeout(() => {
            for (const monster of Object.keys(this.monsters)) {
              this.scene.events.emit('monsterRemoved', this.monsters[monster].id);
            }
            this.monsters = {};
            this.setupSpawners();
          }, 2300);
        }
      }
    });
  }

  setupSpawners() {
    this.monstersSpawners();

    this.timedEvent = this.scene.time.addEvent({
      delay: 100_000_000_000_000_000,
      callback: this.monstersSpawners,
      callbackScope: this,
      loop: true
    });
  }

  monstersSpawners() {
    // let monster = new MonsterModel(
    //   this.monsterLocation[2].x,
    //   this.monsterLocation[2].y,
    //   10,
    //   `monster-${2}`,
    //   100,
    //   10
    // );
    // this.addMonster(monster);

    // monster = new MonsterModel(
    //   this.monsterLocation[3].x,
    //   this.monsterLocation[3].y,
    //   10,
    //   `monster-${3}`,
    //   100,
    //   10
    // );
    // this.addMonster(monster);
    for (const key of Object.keys(this.monsterLocation)) {
      let monsterDead = true;

      for (const monster of Object.keys(this.monsters)) {
        if (this.monsters[monster].id === `monster-${key}`) {
          monsterDead = false;
        }
      }

      if (monsterDead) {
        let monster = new MonsterModel(
          this.monsterLocation[key].x,
          this.monsterLocation[key].y,
          10,
          `monster-${key}`,
          100,
          10
        );

        this.addMonster(monster);
      }
    }
  }

  spawnPlayer() {
    const player = new PlayerModel(this.playerLocation);
    this.player = player;
    this.scene.events.emit('spawnPlayer', player);
  }

  addMonster(monster) {
    this.monsters[monster.id] = monster;
    this.scene.events.emit('monsterSpawn', monster);
  }

  deleteMonster(monsterId) {
    delete this.monsters[monsterId];
  }
}

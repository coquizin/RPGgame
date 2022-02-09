class MonsterModel {
  constructor(x, y, gold, spawnerId, health, attack) {
    this.id = `${spawnerId}`;
    this.spawnerId = spawnerId;
    this.x = x * 2;
    this.y = y * 2;
    this.gold = gold;
    this.health = health;
    this.maxHealth = health;
    this.attack = attack;
  }
}
class MonsterModel {
  constructor(x, y, gold, spawnerId, health, attack) {
    this.id = `${spawnerId}-${uuid.v4()}`;
    this.spawnerId = spawnerId;
    this.x = x * 2;
    this.y = y * 2;
    this.gold = gold;
    this.health = health;
    this.maxHealth = health;
    this.attack = attack;
  }

  loseHealth() {
    this.health -= 40;
    console.log(this.health)
  }
}
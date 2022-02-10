class MonsterModel {
  constructor(x, y, gold, id, health, attack) {
    this.id = id;
    this.x = x * 2;
    this.y = y * 2;
    this.gold = gold;
    this.health = health;
    this.maxHealth = health;
    this.attack = attack;
  }

  loseHealth() {
    this.health -= 80;
    console.log(this.health)
  }
}
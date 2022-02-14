export default class PlayerModel {
  constructor(spawnLocation) {
    this.spawnLocation = spawnLocation;
    this.gold = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.maxMana = 100;
    this.mana = 100;

    this.x = spawnLocation.x;
    this.y = spawnLocation.y;
  }

  loseHealth(damage) {
    this.health -= damage;
  }

  respawn() {
    this.health = this.maxHealth;
    this.spawnLocation = this.spawnLocation;
  }
}

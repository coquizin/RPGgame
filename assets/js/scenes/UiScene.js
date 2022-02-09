class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab a reference to the game scene
    this.gameScene = this.scene.get('Game');
  }

  create() {
    // this.setupUiElements();
    this.createMoldura()
    this.createToll()
    
    this.hpBar = new Bar('health', this.gameScene, 105, 18);
    this.manaBar = new Bar('mana', this.gameScene, 105, 42);
    
    this.setupEvents();

   
  }

    createMoldura(){
      this.molduraIcon = this.add.image(50,40,'moldura').setScale(1.5)
    }

    createToll(){
      this.tollIcon = this.add.image(550,780,'Quick_tool').setScale(2)
    }
  // setupUiElements() {
  //   // create the score text game object
  //   this.scoreText = this.add.text(35, 8, 'Coins: 0', {fontSize: '16px', fill: '#fff'})
  //   // create coin icon
  //   this.coinIcon = this.add.image(15,15, 'items', 3)
  // }

  setupEvents() {
    // listen for the updateScore event from the game scene
    this.gameScene.events.on('playerDamageHealth', (value) => {
      this.hpBar.decrease(value)
    });

    this.gameScene.events.on('playerWasteMana', (value) => {
      this.manaBar.decrease(value)
    });
  }
}
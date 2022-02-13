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
    this.createMoldura();
    this.createToll();
    this.createBar();
    this.setupEvents();
    this.changeMagics();

    // // this.uiBlocked = false;

    // const waterBtn = this.add.image( 483, 783,'water_magic_button').setScale(1.8);
    // const fireBtn = this.add.image( 548, 783,'fire_magic_button').setScale(1.8);
    // const potionBtn = this.add.image( 609, 783,'potion').setScale(1.8);

    // waterBtn.setInteractive();
    // fireBtn.setInteractive();
    // potionBtn.setInteractive();

    // waterBtn.on('pointerdown', () => { console.log('you change the magic for Water Magic'); });
    // fireBtn.on('pointerdown', () => { console.log('you change the magic for fire Magic'); });
    // potionBtn.on('pointerdown', () => { console.log('you are healfed!'); });

    // this.uiBlocked = false;

    // this.gameScene.pickItem = function(){

    //   if(this.scene.uiBlocked)return;

    //   this.scene.selectedItem = this;
    //   this.alpha= 1;
    // }

  }

  changeMagics(){    
    const waterBtn = this.add.sprite( 263, 783,'water_magic').setScale(1.8).setInteractive();
    const fireBtn = this.add.sprite( 327, 783,'fire_magic').setScale(1.8).setInteractive();
    const darkBtn = this.add.sprite(393, 783, 'dark_magic').setScale(1.8).setInteractive();
    const potionBtn = this.add.image( 852, 783,'potion').setScale(1.8).setInteractive();

    darkBtn.anims.play({key: 'DarkMagic_down', repeat: -1}, true)

    waterBtn.anims.play({key: 'waterMagic_down', repeat: -1}, true)
    fireBtn.anims.play({key: 'fireMagic_down', repeat: -1}, true);
    potionBtn.setInteractive();

    waterBtn.on('pointerdown', () => { 
      console.log('you change the magic for Water Magic'); 
      this.gameScene.events.emit('changeMagics', 'water')
    });
    fireBtn.on('pointerdown', () => { 
      console.log('you change the magic for fire Magic');
      this.gameScene.events.emit('changeMagics', 'fire')
     });
     darkBtn.on('pointerdown', () => { 
      console.log('you change the magic for fire Magic');
      this.gameScene.events.emit('changeMagics', 'fire')
     });
    potionBtn.on('pointerdown', () => {
       console.log('you are healfed!'); 
    });
  }


  createBar() {
    this.hpBar = new Bar('health', this.gameScene, 105, 18, this.gameScene.player.maxHealth);
    this.manaBar = new Bar('mana', this.gameScene, 105, 42, this.gameScene.player.maxMana);
  }

  createMoldura(){
     this.molduraIcon = this.add.image(50,40,'moldura').setScale(1.5)
  }

  createToll(){
    const tollIcon = this.add.sprite(550,780,'quick_bar').setScale(2)
    tollIcon.anims.play({key:'quickBar', repeat: -1}, true)
  }
  // setupUiElements() {
  //   // create the score text game object
  //   this.scoreText = this.add.text(35, 8, 'Coins: 0', {fontSize: '16px', fill: '#fff'})
  //   // create coin icon
  //   this.coinIcon = this.add.image(15,15, 'items', 3)
  // }

  setupEvents() {
    // listen for the updateScore event from the game scene
    this.gameScene.events.on('playerBarRespawn', () => {
      this.hpBar.respawn()
      this.manaBar.respawn()
    });


    this.gameScene.events.on('playerDamageHealthBar', (value) => {
      this.hpBar.updateHealth(value)
    });

    this.gameScene.events.on('playerWasteManaBar', (value) => {
      this.manaBar.decrease(value)

    });
  }
}
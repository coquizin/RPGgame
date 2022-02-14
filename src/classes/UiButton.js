import Phaser from 'phaser';

export default class UiButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, hoverKey, text, targetCallback) {
    super(scene, x, y);
    this.x = x; // the x position of our container
    this.y = y; // the y position of our container
    this.key = key; // the background image of our button
    this.scene = scene; // the scene this container will be added to
    this.targetCallback = targetCallback; // the call function that will be called when the player click the burron
    this.hoverKey = hoverKey; // the image that willl be displayed when the play hovers over the button
    this.text = text; // the text that will be displayed on the button

    // create our Ui burron
    this.createButton();
    // add this container to our Phase Scene
    this.scene.add.existing(this);
  }

  createButton() {
    // create button
    this.button = this.scene.add.image(0, 0, 'button1').setScale(1.4).setInteractive();

    // create button text
    this.buttonText = this.scene.add.text(0, 0, this.text, { fontSize: '26px', fill: '#fff' });
    // center the button text inside the Ui button
    Phaser.Display.Align.In.Center(this.buttonText, this.button);

    // add the two game objects to our container
    this.add(this.button);
    this.add(this.buttonText);

    // listen for events
    this.button.on('pointerdown', () => {
      this.targetCallback();
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(this.hoverKey);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(this.key);
    });
  }
}

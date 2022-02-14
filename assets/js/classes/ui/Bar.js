class Bar { 
    constructor (name, scene, x, y, valueMax)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setScrollFactor(0, 0);
        
        this.name = name;
        this.x = x;
        this.y = y;
        this.value = valueMax;
        this.valueMax = valueMax;
        this.p = 120 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    respawn() {
        this.value = this.valueMax;
        this.draw();
    }

    updateHealth(health) {
        this.value = health;
        this.draw();
    }

    increase (amount)
    {
        if ( this.value < 100) {
            if ( this.value + amount > 100) {
                this.value = 100
            } else {
                this.value += amount
            }
        }

        this.draw();

        return (this.value === 100);
    }

    decrease (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw ()
    {
        this.bar.clear();

        this.bar.fillStyle(0xffffff);
        this.bar.fillRoundedRect(this.x, this.y, 124, 19, 0);

        if (this.value < 30)
        {
            if (this.name === 'health') {
                this.bar.fillStyle(0x07F203);
            } else if (this.name === 'mana') {
                this.bar.fillStyle(0x1E1CFF);
            }
        }
        else
        {
            if (this.name === 'health') {
                this.bar.fillStyle(0x07F203);
            } else if (this.name === 'mana') {
                this.bar.fillStyle(0x1E1CFF);
            }
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRoundedRect(this.x + 2, this.y + 2, d, 15, 0);
    }
}
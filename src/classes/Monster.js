import Phaser from 'phaser';

export default class Monster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, id, health, maxHealth) {
    super(scene, x, y, key);
    this.scene = scene;
    this.id = id;
    this.key = key;
    this.x = x;
    this.y = y;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = 10;
    this.range = 250;
    this.speed = 50;

    this.lastDirection = `None`;
    this.lastTilePosition = { x: -1, y: -1 };

    this.lastAnimation = `rat_idle_down`;
    this.lastFlipX = undefined;

    this.anims.play({ key: `${key}_idle_down`, repeat: -1 }, true);
    // enable physics
    this.scene.physics.world.enable(this);

    this.setImmovable(true);
    // scale our monster
    this.setScale(2);
    // colide with world bounds
    this.body.setCollideWorldBounds(true);
    // add the monster to our existing scene
    this.scene.add.existing(this);

    this.createHealthBar();

    this.setOrigin(0);
    this.setBodySize(30, 30);
  }

  setNormalHit() {
    this.setBodySize(30, 30);
  }

  setRangeHit() {
    this.setCircle(40);
    this.setOffset(-20, -20);
  }

  update(cursors, player, monster, monsters) {
    this.x = monster.x;
    this.y = monster.y;
    this.updateHealthBar();
    this.startMovement(cursors, player, monsters);
  }

  handleBody() {
    if (this.body.velocity.x !== 0) {
      if (this.body.velocity.x > 0) {
        this.anims.play('rat_move_side', true);
      } else {
        this.anims.play('rat_move_side', true);
      }
    } else if (this.body.velocity.y !== 0) {
      if (this.body.velocity.y > 0) {
        this.anims.play('rat_move_down', true);
      } else {
        this.anims.play('rat_move_up', true);
      }
    } else {
      this.setVelocity(0);
      this.anims.play({ key: `${this.key}_idle_down`, repeat: -1 }, true);
    }
  }

  startMovement(cursors, player, monsters) {
    // const x = this.x
    // const y = this.y

    // if (!Phaser.Geom.Rectangle.Contains(this.scene.physics.world.bounds, x, y))
    // {
    //   // don't switch direction when outside of world; being wrapped
    //   return
    // }

    // const gx = (Math.floor(x / 16) * 16)
    // const gy = (Math.floor(y / 16) * 16)

    // if (this.lastTilePosition.x === gx && this.lastTilePosition.y === gy)
    // {
    //   // skip if we just handled this position
    //   return
    // }

    // // if (Math.abs(x - gx) > 4 || Math.abs(y - gy) > 4)
    // // {
    // // 	return
    // // }

    // this.x = gx
    // this.y = gy

    // this.lastTilePosition.x = gx
    // this.lastTilePosition.y = gy

    // this.aiBehavior = new ChasePlayerAI(player, monster, board)

    // const speed = this.aiBehavior.speed()
    // const {closestDirection, closestDistance} = this.aiBehavior.pickDirection()

    // console.log(closestDirection, closestDistance)

    // // const tPos = this.aiBehavior.targetPosition()
    // // this.targetIndicator.setPosition(tPos.x, tPos.y)

    // switch (closestDirection)
    // {
    //   case `Left`:
    //     // this.look(Direction.Left)
    //     this.setVelocity(-speed, 0)
    //     break

    //   case `Right`:
    //     // this.look(Direction.Right)
    //     this.setVelocity(speed, 0)
    //     break

    //   case `Up`:
    //     // this.look(Direction.Up)
    //     this.setVelocity(0, -speed)
    //     break

    //   case `Down`:
    //     // this.look(Direction.Down)
    //     this.setVelocity(0, speed)
    //     break
    // }

    // this.lastDirection = closestDirection

    const distanceX = player.x - this.x;
    const distanceY = player.y - this.y;

    // if (Math.abs(distanceX) < 200 && Math.abs(distanceY) < 200) {
    //   console.log('a');
    //   this.setRangeHit();
    // } else {
    //   this.setNormalHit();
    // }

    const rotation = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
    // console.log(rotation)
    // console.log(this.body.angle)

    // const canEnter = board.map(item => console.log(item))

    // if (board.getTileAtWorldXY(this.x, this.y))
    // {
    //   // cannot move into walls
    //   return
    // }

    // const targetDegrees = Phaser.Math.RadToDeg(rotation);

    // console.log(targetDegrees)

    // let canEnter = true;
    // monsters.getChildren().forEach((monster) => {
    //   if (this.id !== monster.id) {
    //     const actualMonsterX = this.x
    //     const actualMonsterY = this.y
    //     const targetMonsterY = monster.y
    //     const targetMonsterX = monster.y

    //     const distanceBetweenX = (actualMonsterX - targetMonsterX ) + 32
    //     const distanceBetweenY = (actualMonsterY - targetMonsterY ) + 32
    //     const calculateDistance = Math.abs((actualMonsterX - targetMonsterX))

    //     if (actualMonsterX >= targetMonsterX - 48 || actualMonsterY >= targetMonsterY - 48) {
    //       console.log(`perto`)
    //     }
    //     // if (actualMonsterX > (targetMonsterX))
    //     // if (distanceBetweenX+32 )
    //     console.log(monster.id, actualMonsterX, actualMonsterY, targetMonsterX, targetMonsterY)
    //     // if ()
    //   }
    // })

    if (Math.abs(distanceX) < this.range || Math.abs(distanceY) < this.range) {
      this.handleBody();
      if ((rotation >= 2.4 && rotation <= 4) || (rotation <= -2.4 && rotation >= -4)) {
        //"Left";
        this.setFlipX(true);
        // this.setVelocityY(0);
        this.setVelocityX(Math.sign(distanceX) * this.speed);
      } else if ((rotation >= 0 && rotation <= 0.8) || (rotation <= 0 && rotation >= -0.8)) {
        //"Right";
        this.setFlipX(false);
        // this.setVelocityY(0);
        this.setVelocityX(Math.sign(distanceX) * this.speed);
      } else if (rotation < -0.8 && rotation > -2.4) {
        // up
        // this.setVelocityX(0)
        this.setVelocityY(Math.sign(distanceY) * this.speed);
      } else if (rotation > 0.8 && rotation < 2.4) {
        //"Down";
        // this.setVelocityX(0)
        this.setVelocityY(Math.sign(distanceY) * this.speed);
      }
    } else {
      this.setVelocity(0);
      this.anims.play({ key: `${this.key}_idle_down`, repeat: -1 }, true);
    }
  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  updateHealth(health) {
    if (this.health <= 0) return;

    this.health = health;
    this.updateHealthBar();
  }

  updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff_ff_ff, 1);
    this.healthBar.fillRect(this.x + 18, this.y - 2, 64, 6);
    // creating a gradient rectangle
    this.healthBar.fillGradientStyle(0xf1_0a_0a, 0xff_00_00, 4);
    this.healthBar.fillRect(this.x + 18, this.y - 2, 64 * (this.health / this.maxHealth), 6);
  }

  destroyMonster() {
    this.healthBar.clear();
    this.destroy();
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
  }
}

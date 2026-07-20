import Phaser from 'phaser'

const MOVE_SPEED = 250
const JUMP_VELOCITY = 350

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super('GameScene')
  }

  create() {
    this.player = this.add.rectangle(400, 300, 50, 80, 0xff0000)
    this.physics.add.existing(this.player)

    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height)
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body
    playerBody.setCollideWorldBounds(true)

    const floor = this.add.rectangle(400, 550, 800, 50, 0x00ff00)
    this.physics.add.existing(floor, true)

    this.physics.add.collider(this.player, floor)

    this.cursors = this.input.keyboard!.createCursorKeys()
  }

  update() {
    const body = this.player.body as Phaser.Physics.Arcade.Body

    if (this.cursors.left.isDown) {
      body.setVelocityX(-MOVE_SPEED)
    } else if (this.cursors.right.isDown) {
      body.setVelocityX(MOVE_SPEED)
    } else {
      body.setVelocityX(0)
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && body.blocked.down) {
      body.setVelocityY(-JUMP_VELOCITY)
    }
  }
}

class ChasePlayerAI {
  constructor(player, monster, board) {
    this.player = player;
    this.monster = monster;
    this.board = board;

		this.Direction = {
			Left: `Left`,
			Right: `Right`,
			Up: `Up`,
			Down: `Down`,
	
			None: `None`
		}
	}

	getOrderedDirections = (filter) => {
		const dirs = [this.Direction.Up, this.Direction.Left, this.Direction.Down, this.Direction.Right]
		if (!filter)
		{
			return dirs
		}
		return dirs.filter(filter)
	}

	getOppositeDirection = (direction) => {
		switch (direction)
		{
			case this.Direction.Left:
				return this.Direction.Right
			case this.Direction.Right:
				return this.Direction.Left
			case this.Direction.Up:
				return this.Direction.Down
			case this.Direction.Down:
				return this.Direction.Up
		}
	}

  positionInDirection = (x, y, direction) => {
		switch (direction)
		{
			case this.Direction.Up:
				return { x, y: y - 16 }
	
			case this.Direction.Left:
				return { x: x - 16, y }
	
			case this.Direction.Down:
				return { x, y: y + 16 }
	
			case this.Direction.Right:
				return { x: x + 16, y }
	
			default:
				return { x, y }
		}
	}
	
	determineDirectionFromTarget = (x, y, targetX, targetY, directions, board) => {
		let closestDirection = this.Direction.None
		let closestDistance = -1
	
		for (const dir of directions)
		{
			const position = this.positionInDirection(x, y, dir)
	
			if (board.getTileAtWorldXY(position.x, position.y))
			{
				// cannot move into walls
				continue
			}
	
			const d = Phaser.Math.Distance.Between(position.x, position.y, targetX, targetY)
			if (closestDirection === this.Direction.None)
			{
				// first possible direction
				closestDirection = dir
				closestDistance = d
				continue
			}
	
			if (d < closestDistance)
			{
				closestDirection = dir
				closestDistance = d
			}
		}
	
		return { closestDirection, closestDistance }
	}

  speed()	{
		return 100
	}

	targetPosition() {
		return {
			x: this.player.x,
			y: this.player.y
		}
	}

  pickDirection() {
		const tx = this.player.x
		const ty = this.player.y


		const backwardsPosition = this.getOppositeDirection(this.monster.lastDirection)
		const directions = this.getOrderedDirections(dir => dir !== backwardsPosition)

		return this.determineDirectionFromTarget(
			this.monster.x, 
			this.monster.y,
			tx, 
			ty,
			directions,
			this.board
		)
	}
} 
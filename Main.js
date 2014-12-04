//main.js
(function() {
var testState, testPlayer, bullet;
var game, cursors, direction, controlButton, enemy = null;

window.onload = function() {
	game = new Phaser.Game(640,480, Phaser.CANVAS, "gameWindow");
	
	//
	game.state.add('level', testState);
	game.state.start('level');
}

testState = {
	preload: function() {
		game.load.image('testPlayer', 'gfx/player3.png');
		game.load.image('bullet', 'gfx/bullet.png');
		game.load.image('tile', 'gfx/tile.png');
		game.load.image('enemy', 'gfx/enemy2.png');
    },

    create: function() {
    	game.physics.startSystem(Phaser.Physics.ARCADE);
	  	testPlayer = game.add.sprite(10, game.height - 50, 'testPlayer');

	  	game.physics.arcade.enable(testPlayer);
	  	testPlayer.collideWorldBounds = true;
	  	cursors = game.input.keyboard.createCursorKeys();
	  	game.add.tileSprite(0, 0, 640, 480, 'tile');

	  	enemy = game.add.sprite(100, game.height - 100, 'enemy');
	  	game.physics.arcade.enable(enemy);
	  	game.debug.spriteInfo(enemy, 32, 32);

	  	
    },
    
	//System fizyki P2 jest lepszy, zaś Arcade jest prostszy (wszystkie 
	//obiekty są prostokątami)
    update: function() {
		if(cursors.up.isDown) //ZMIENIĆ NA Phaser.Keyboard.isDown etc
		{
			//testPlayer.body.velocity.y = -50;
			testPlayer.body.y -= 4;
			direction = 1;
		}
		else if(cursors.down.isDown) 
		{
			testPlayer.body.y += 4;
			direction = 3;
		}
		else if(cursors.left.isDown)
		{
			testPlayer.body.x -= 4;
			direction = 4;
		}
		else if(cursors.right.isDown)
		{
			testPlayer.body.x += 4;
			direction = 2;
		}
		else if(game.input.keyboard.justPressed(17, 50))
		{
			//console.log('working');
			bullet = game.add.sprite(testPlayer.body.x, testPlayer.body.y, 'bullet');
			game.physics.enable(bullet);
			if(direction == 1)
				bullet.body.velocity.y = -100;
			else if(direction == 2)
				bullet.body.velocity.x = 100;
			else if(direction == 3)
				bullet.body.velocity.y = 100;
			else if(direction == 4)
				bullet.body.velocity.x = -100;
		}

		
		testPlayer.bringToTop();
		//enemy move
		

		if(!enemy.game) {
			enemy = game.add.sprite(100, game.height - 100, 'enemy');
	  		game.physics.arcade.enable(enemy);
		}
		
		//
		if(enemy.game)
			game.physics.arcade.moveToObject(enemy, testPlayer, 10);

		game.physics.arcade.collide(bullet, enemy, killHim);
    	//console.log(enemy);
    	
    	//game.debug.spriteInfo(enemy, 32, 32);
    }
		
  }

  function killHim(bullet, enemy) {
  	//enemy.body.checkCollision = {up: false, down:false, right: false, left: false};
  	//bullet.body.checkCollision = {up: false, down:false, right: false, left: false};
  	//enemy.destroy();
  	//enemy.body.velocity.x = 0;
  	//enemy.body.velocity.y = 0;
  	bullet.destroy();
  	enemy.destroy();
  	//enemy.kill(); //kill() a destroy()?
  }
})()
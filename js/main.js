window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {

        game.load.image( 'world', 'assets/32.jpg' );
        game.load.image( 'ambulance', 'assets/ambl.png');
        game.load.image( 'cars', 'assets/car.png');
		    game.load.image( 'lefts', 'assets/leftee.png');
        game.load.image( 'deerz', 'assets/deers.png');
		        game.load.image( 'leftDeers', 'assets/leftDeers.png');
		game.load.image( 'hospital', 'assets/hospital.png');
        game.load.audio( 'music', 'assets/race.mp3');
        game.load.audio( 'deerzSound', 'assets/explode1.wav');
    }
    
var time;
    var world;
 
    var player;
    
	var hos;
 
    var carz;
    var carTimer = 2500;
    var nextCar = 0;
    var carCount = 0;
    var mincarTimer = 100;
	
	
	   var leftz;
    var leftTimer = 2500;
    var nextLeft = 0;
    var leftCount = 0;
    var minleftTimer = 100;
    

    var deerzs;
    var deerzTimer = 2000;
    var nextdeerz = 0;
	
	
	    var leftDeerzs;
    var leftDeerzTimer = 2000;
    var nextLeftDeerz = 0;
    

    var lost;
    var style;
    var lives;
    var isAlive;
    

    var cursors;
    var fireButton;
    
 
    var music;
    var deerzfx;
    

    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
       
        world = game.add.tileSprite(0, 0, 800, 600, 'world');
        player = game.add.sprite( game.world.centerX, 550, 'ambulance');
        

        player.anchor.setTo( 0.5, 0.5 );
        
        
        game.physics.enable( player, Phaser.Physics.ARCADE );
      
        player.body.collideWorldBounds = true;
        
    
        carz = game.add.group();
        carz.enableBody = true;
        carz.physicsBodyType = Phaser.Physics.ARCADE;
        carz.createMultiple(50, 'cars', 0, false);
        carz.setAll('anchor.x', 0.5);
        carz.setAll('anchor.y', 0.5);
        carz.setAll('outOfBoundsKill', true);
        carz.setAll('checkWorldBounds', true);
		
		
		        leftz = game.add.group();
        leftz.enableBody = true;
        leftz.physicsBodyType = Phaser.Physics.ARCADE;
        leftz.createMultiple(50, 'lefts', 0, false);
        leftz.setAll('anchor.x', 0.5);
        leftz.setAll('anchor.y', 0.5);
        leftz.setAll('outOfBoundsKill', true);
        leftz.setAll('checkWorldBounds', true);
		
		

        
     

        deerzs = game.add.group();
        deerzs.enableBody = true;
        deerzs.physicsBodyType = Phaser.Physics.ARCADE;
        deerzs.createMultiple(30, 'deerz', 0, false);
        deerzs.setAll('anchor.x', 0.5);
        deerzs.setAll('anchor.y', 0.5);
        deerzs.setAll('outOfBoundsKill', true);
        deerzs.setAll('checkWorldBounds', true);
		
		
        leftDeerzs = game.add.group();
        leftDeerzs.enableBody = true;
        leftDeerzs.physicsBodyType = Phaser.Physics.ARCADE;
        leftDeerzs.createMultiple(30, 'leftDeers', 0, false);
        leftDeerzs.setAll('anchor.x', 0.5);
        leftDeerzs.setAll('anchor.y', 0.5);
        leftDeerzs.setAll('outOfBoundsKill', true);
        leftDeerzs.setAll('checkWorldBounds', true);
        
    
        cursors = game.input.keyboard.createCursorKeys();
 
        

        music = game.add.audio('music', 1, true);
        music.play('', 0, 1, true);
        deerzfx = game.add.audio('deerzSound');
        
     
        isAlive = true;
        lives = 3;
        
        style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    }
    
    function update() {
       
        world.tilePosition.y += 5;
		time= (50000-game.time.now)/1000;
        
        
        player.body.velocity.setTo(0, 0);
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -200;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 200;
        }
        
  
		
		if(game.time.now>50000)
		{
		createHospital();
		carz.removeAll();
		leftz.removeAll();
		deerzs.removeAll();
		leftDeerzs.removeAll();
		world.tilePosition.y-=5;
		}
        
       
        createdeerz();
		createLeftDeerz();
        
        
        createEnemy();
		createLeft();
		
        
     
    
        game.physics.arcade.overlap(carz, player, carsHandler, null, this);
		  game.physics.arcade.overlap(leftz, player, leftsHandler, null, this);
        game.physics.arcade.overlap(deerzs, player, deerzHandler, null, this);
		    game.physics.arcade.overlap(leftDeerzs, player, leftDeerzHandler, null, this);
		 game.physics.arcade.overlap(player, hos, hosHandler, null, this);
    }
    

    
    function createdeerz() {
        if (game.time.now > nextdeerz && deerzs.countDead() > 0)
        {
            nextdeerz = game.time.now + deerzTimer;

            var deerz = deerzs.getFirstExists(false);

            deerz.reset(800, game.world.randomY);

            deerz.body.velocity.x = -100;
        }
    }
	
	
	    
    function createLeftDeerz() {
        if (game.time.now > nextLeftDeerz && leftDeerzs.countDead() > 0)
        {
            nextLeftDeerz = game.time.now + leftDeerzTimer;

            var Ldeerz = leftDeerzs.getFirstExists(false);

            Ldeerz.reset(0, game.world.randomY);

            Ldeerz.body.velocity.x = +100;
        }
    }
    
    function createEnemy() {
        if (carz.countDead() > 0&&game.time.now > nextCar )
        {
            if(carTimer > mincarTimer)
            {
                carCount += 1;
                if(carCount >= 5)
                {
                    carCount = 0;
                    carTimer -= 100;
                }
            }
            
            nextCar = game.time.now + carTimer;

            var enemy = carz.getFirstExists(false);

            enemy.reset(game.world.width - game.world.randomX / 2,0);

            enemy.body.velocity.y = +250;
        }
    }
	
	function createLeft() {
        if (leftz.countDead() > 0&&game.time.now > nextLeft )
        {
            if(leftTimer > minleftTimer)
            {
                leftCount += 1;
                if(leftCount >= 5)
                {
                    leftCount = 0;
                    leftTimer -= 100;
                }
            }
            
            nextLeft = game.time.now + leftTimer;

            var left = leftz.getFirstExists(false);

            left.reset(game.world.randomX / 2,0);

            left.body.velocity.y = +550;
        }
    }
    
	function createHospital(){
	
	
	
			hos = game.add.sprite( game.world.centerX, 50, 'hospital');
			  
        game.physics.enable( hos, Phaser.Physics.ARCADE );
		
		      hos.anchor.setTo( 0.5, 0.5 );
	
	}
	
	function hosHandler(player, hos){
	
	   player.kill();
            isAlive = false;
			

	 lost = game.add.text(game.world.centerX, game.world.centerY, "You have arrived!", style);
            lost.anchor.setTo( 0.5, 0.5);

	
	}
	


    
    function carsHandler(player, enemy)
    {
        enemy.kill();
		 deerzfx.play();
        if(lives > 0)
            lives -= 1;
        
        if(lives <= 0)
        {
            player.kill();
            isAlive = false;
            lost = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER!\n Press F5 to restart", style);
            lost.anchor.setTo( 0.5, 0.5);
        }
    }
	
	    function leftsHandler(player, left)
    {
        left.kill();
		 deerzfx.play();
        if(lives > 0)
            lives -= 1;
        
        if(lives <= 0)
        {
            player.kill();
            isAlive = false;
            lost = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER!\n Press F5 to restart", style);
            lost.anchor.setTo( 0.5, 0.5);
        }
    }
    
    
    function deerzHandler(player, deerz)
    {
        deerz.kill();
        deerzfx.play();
 
        
       if(lives > 0)
            lives -= 1;
        
        if(lives <= 0)
        {
            player.kill();
            isAlive = false;
            lost = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER!\n Press F5 to restart", style);
            lost.anchor.setTo( 0.5, 0.5);
        }
    }
	
	    
    function leftDeerzHandler(player, Ldeerz)
    {
        Ldeerz.kill();
        deerzfx.play();
 
        
       if(lives > 0)
            lives -= 1;
        
        if(lives <= 0)
        {
            player.kill();
            isAlive = false;
            lost = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER!\n Press F5 to restart", style);
            lost.anchor.setTo( 0.5, 0.5);
        }
    }
    
    
    function render() {    
        game.debug.text('Lives: ' + lives, 0, 50);
		game.debug.text('Time remaining to hospital: ' + time+' seconds', 0, 100);
    }
};

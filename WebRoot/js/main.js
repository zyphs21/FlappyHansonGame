// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = 
{
		
		/*
		 *Function called first to load all the assets*/
    preload: function() 
    { 
    	//改变游戏的背景颜色
			this.game.stage.backgroundColor = '#71c5cf';
			
			//加载小鸟图片
			this.game.load.image('brid','assets/bird.png');
			//加载水管图片
			this.game.load.image('pipe','assets/pipe.png');
			//加载音乐
			this.game.load.audio('jump','assets/jump.wav');
    },
		
		/*
		 *Fuction called after 'preload' to setup the game*/
    create: function() 
    { 
    	//把小鸟显示在屏幕上
    	this.bird = this.game.add.sprite(100,245,'brid');
    	
    	//给小鸟加上重力让它可以掉下来
    	this.bird.body.gravity.y = 1000;
    	
    	//加上声音
    	this.jump_sound = this.game.add.audio('jump');
    	    	
    	//调用jump方法当空格键被按下
    	var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	space_key.onDown.add(this.jump,this); 
    	
    	//加入水管组，并用20个游标来控制
    	this.pipes = game.add.group();
    	this.pipes.createMultiple(20,'pipe');  
    	
    	//为了让水管加入到游戏中需要没1.5秒刷新一次，加入一个timer
    	this.timer = this.game.time.events.loop(1500,this.add_row_of_pipes,this); 
    	
    	//加入显示分数功能
    	this.score = 0;
    	var style = {font:"30px Arial",fill:"#dc143c  "};
    	this.label_score = this.game.add.text(20,20,"0",style);
    	
    	//改变小鸟的旋转中心
    	this.bird.anchor.setTo(-0.2, 0.5);
    	
    },
    
    /*
     *Function called 60 times per second*/
    update: function() 
    {
			//如果小鸟飞得太高或者太低超出游戏界面调用restart_game方法
			if(this.bird.inWorld == false)
					this.restart_game();
			
			//当小鸟碰到水管加入死亡动画
			this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);
			
			//让小鸟有一个倾斜
			if(this.bird.angle < 20)
			{
				this.bird.angle += 1;
			}
    },
    
    /*
     *让小鸟跳的方法*/
    jump:function()
    {
    	if(this.bird.alive == false)
    		return;
    	
    	//给小鸟加上竖直的速率
    	this.bird.body.velocity.y = -350;
    	
    	//加上声音
    	this.jump_sound.play();
    	
    	//给小鸟的跳动加上动画
    	var animation = this.game.add.tween(this.bird).to({angle:-20}, 100).start();
    	
    	/*上面的代码也可以分开写如下
    	//(不懂怎么翻译)Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    	animation.to({angle:-20}, 100);
    	
    	//启动这个动画
    	animation.start();
    	*/
    },
    
    /*
     *重新开始游戏*/
    restart_game:function()
    {
    	//将计时器停止当重新开始游戏的时候 改代码需放在第一
    	this.game.time.events.remove(this.timer);
    	
    	//开始main_state就是重新开始游戏
    	this.game.state.start('main');
    },
    
    /*
     *将水管加入到游戏中*/
    add_one_pipe:function(x,y)
    {
    	//将第一个没有创建显示的水管从group中取出
    	var pipe = this.pipes.getFirstDead();
    	
    	//设置一个新的坐标给这个水管
    	pipe.reset(x,y);
    	
    	//给一个速度给水管让它可以向左移动
    	pipe.body.velocity.x = -200;
    	
    	//当水管不用再显示将它终止
    	pipe.outOfBoundsKill = true;
    },
    
    /*
     *该方法用于显示6个水管在一行并且有一个洞在某个地方*/
    add_row_of_pipes:function()
    {
    	var hole = Math.floor(Math.random()*5)+1;
    	
    	for(var i=0; i<8; i++)
    	{
    		if(i != hole && i != hole+1)
    			this.add_one_pipe(400,i*60+10);
    	}
    	
    	//让获得的分数自增
    	this.score += 1;
    	this.label_score.content = this.score;
    },
    
    /*
     *一个死亡动画*/
    hit_pipe:function()
    {
    	//让还生存的小鸟原型设置为false
    	this.bird.alive = false;
    	
    	//阻止新的水管出现
    	this.game.time.events.remove(this.timer);
    	
    	//停止所有的水管移动
    	this.pipes.forEachAlive(function(p)
	    	{
	    		p.body.velocity.x = 0;
	    	}, this);
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 
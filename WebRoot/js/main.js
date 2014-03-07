// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = 
{
		
		/*
		 *Function called first to load all the assets*/
    preload: function() 
    { 
    	//�ı���Ϸ�ı�����ɫ
			this.game.stage.backgroundColor = '#71c5cf';
			
			//����С��ͼƬ
			this.game.load.image('brid','assets/bird.png');
			//����ˮ��ͼƬ
			this.game.load.image('pipe','assets/pipe.png');
			//��������
			this.game.load.audio('jump','assets/jump.wav');
    },
		
		/*
		 *Fuction called after 'preload' to setup the game*/
    create: function() 
    { 
    	//��С����ʾ����Ļ��
    	this.bird = this.game.add.sprite(100,245,'brid');
    	
    	//��С����������������Ե�����
    	this.bird.body.gravity.y = 1000;
    	
    	//��������
    	this.jump_sound = this.game.add.audio('jump');
    	    	
    	//����jump�������ո��������
    	var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	space_key.onDown.add(this.jump,this); 
    	
    	//����ˮ���飬����20���α�������
    	this.pipes = game.add.group();
    	this.pipes.createMultiple(20,'pipe');  
    	
    	//Ϊ����ˮ�ܼ��뵽��Ϸ����Ҫû1.5��ˢ��һ�Σ�����һ��timer
    	this.timer = this.game.time.events.loop(1500,this.add_row_of_pipes,this); 
    	
    	//������ʾ��������
    	this.score = 0;
    	var style = {font:"30px Arial",fill:"#dc143c  "};
    	this.label_score = this.game.add.text(20,20,"0",style);
    	
    	//�ı�С�����ת����
    	this.bird.anchor.setTo(-0.2, 0.5);
    	
    },
    
    /*
     *Function called 60 times per second*/
    update: function() 
    {
			//���С��ɵ�̫�߻���̫�ͳ�����Ϸ�������restart_game����
			if(this.bird.inWorld == false)
					this.restart_game();
			
			//��С������ˮ�ܼ�����������
			this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);
			
			//��С����һ����б
			if(this.bird.angle < 20)
			{
				this.bird.angle += 1;
			}
    },
    
    /*
     *��С�����ķ���*/
    jump:function()
    {
    	if(this.bird.alive == false)
    		return;
    	
    	//��С�������ֱ������
    	this.bird.body.velocity.y = -350;
    	
    	//��������
    	this.jump_sound.play();
    	
    	//��С����������϶���
    	var animation = this.game.add.tween(this.bird).to({angle:-20}, 100).start();
    	
    	/*����Ĵ���Ҳ���Էֿ�д����
    	//(������ô����)Set the animation to change the angle of the sprite to -20�� in 100 milliseconds
    	animation.to({angle:-20}, 100);
    	
    	//�����������
    	animation.start();
    	*/
    },
    
    /*
     *���¿�ʼ��Ϸ*/
    restart_game:function()
    {
    	//����ʱ��ֹͣ�����¿�ʼ��Ϸ��ʱ�� �Ĵ�������ڵ�һ
    	this.game.time.events.remove(this.timer);
    	
    	//��ʼmain_state�������¿�ʼ��Ϸ
    	this.game.state.start('main');
    },
    
    /*
     *��ˮ�ܼ��뵽��Ϸ��*/
    add_one_pipe:function(x,y)
    {
    	//����һ��û�д�����ʾ��ˮ�ܴ�group��ȡ��
    	var pipe = this.pipes.getFirstDead();
    	
    	//����һ���µ���������ˮ��
    	pipe.reset(x,y);
    	
    	//��һ���ٶȸ�ˮ���������������ƶ�
    	pipe.body.velocity.x = -200;
    	
    	//��ˮ�ܲ�������ʾ������ֹ
    	pipe.outOfBoundsKill = true;
    },
    
    /*
     *�÷���������ʾ6��ˮ����һ�в�����һ������ĳ���ط�*/
    add_row_of_pipes:function()
    {
    	var hole = Math.floor(Math.random()*5)+1;
    	
    	for(var i=0; i<8; i++)
    	{
    		if(i != hole && i != hole+1)
    			this.add_one_pipe(400,i*60+10);
    	}
    	
    	//�û�õķ�������
    	this.score += 1;
    	this.label_score.content = this.score;
    },
    
    /*
     *һ����������*/
    hit_pipe:function()
    {
    	//�û������С��ԭ������Ϊfalse
    	this.bird.alive = false;
    	
    	//��ֹ�µ�ˮ�ܳ���
    	this.game.time.events.remove(this.timer);
    	
    	//ֹͣ���е�ˮ���ƶ�
    	this.pipes.forEachAlive(function(p)
	    	{
	    		p.body.velocity.x = 0;
	    	}, this);
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 
const cvs = document.getElementById('game-board');
const ctx = cvs.getContext("2d");

//user paddle
const user = {
	x : 0,
	y : cvs.height/2 - 50,
	width : 10,
	height : 100,
	color : "WHITE",
	score : 0
}

//computer paddle
const com = {
	x : cvs.width - 10,
	y : cvs.height/2 - 50,
	width : 10,
	height : 100,
	color : "WHITE",
	score : 0
}

//ball
const ball = {
	x : cvs.width/2,
	y : cvs.height/2,
	radius : 10,
	speed : 5,
	velocityX : 5,
	velocityY : 5,
	color : "WHITE"
}

//net
const net = {
	x : cvs.width/2 - 1,
	y : 0,
	width : 2,
	height : 10,
	color : "WHITE"
}

//draw rectangle
function drawRect(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}
drawRect(0,0,cvs.width,cvs.height,"BLACK");

//draw circle
function drawCircle(x,y,r,color){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2,false);
	ctx.closePath();
	ctx.fill();
}
drawCircle(cvs.width/2,cvs.height/2,10,"WHITE");

//draw net
function drawNet(){
	ctx.fillStyle = "WHITE";
	for(let i = 0; i < cvs.height; i += 15){
		drawRect(net.x,net.y + i,net.width,net.height,net.color);
	}
}

//draw text
function drawText(text,x,y,color){
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y);
}

//rendering
function render(){
	//clear canvas
	drawRect(0,0,cvs.width,cvs.height,"BLACK");

	//draw net
	drawNet();

	//draw paddles
	drawRect(user.x,user.y,user.width,user.height,user.color);
	drawRect(com.x,com.y,com.width,com.height,com.color);

	//draw ball
	drawCircle(ball.x,ball.y,ball.radius,ball.color);

	//draw scores
	drawText(user.score,cvs.width/4,cvs.height/5,user.color);
	drawText(com.score,3*cvs.width/4,cvs.height/5,com.color);
}

//reset
function reset(){
	ball.x = cvs.width/2;
	ball.y = cvs.height/2;
	ball.speed = 5;
	ball.velocityX = -ball.velocityX;
}

//update(game logic)
function update(){
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;
	if(ball.radius + ball.y >= cvs.height || ball.y - ball.radius <= 0){
		ball.velocityY = -ball.velocityY;
	}

	//com AI
	level = 0.1;
	com.y += (ball.y - (com.y + com.height/2))*level;

	//collision with user or computer
	let player = (cvs.width/2 > ball.x) ? user : com;

	//collision
	if(collDetection(ball,player)){
        let collPoint = ball.y - (player.y + player.height/2);
        collPoint = collPoint/(player.height/2);
        let angle = collPoint*Math.PI/4;

        //direction
        let dir = (cvs.width/2 > ball.x) ? 1 : -1;

        ball.velocityX = dir * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);


        //speed increases after every hit
        ball.speed += 0.5;
	}
	//score increment
    if(ball.x - ball.radius < 0){
        com.score++;
      	reset();
    }
    else if(ball.x + ball.radius > cvs.width){
        user.score++;
       	reset();
    }
}


//event listener
cvs.addEventListener("mousemove",movePaddle);

//event handler
function movePaddle(e){
	let move = cvs.getBoundingClientRect();
	user.y = e.clientY - move.top - user.height/2;
}

//collision detection
function collDetection(b,p){
	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x + b.radius;

	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left = p.x;
	p.right = p.x + p.width;

	return b.right > p.left && b.top < p.bottom && b.bottom > p.top && b.left < p.right; 
}

//game
function game(){
	update();
	render();
}

//loop
const fps = 50;
setInterval(game,1000/fps);
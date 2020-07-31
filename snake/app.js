const cvs = document.getElementById('game-board');
const ctx = cvs.getContext('2d');

//unit
const box = 32;

//load images
const groundImg = new Image();
groundImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio
let left = new Audio();
left.src = "audio/left.mp3";

let right = new Audio();
right.src = "audio/right.mp3";

let up = new Audio();
up.src = "audio/up.mp3";

let down = new Audio();
down.src = "audio/down.mp3";

let dead = new Audio();
dead.src = "audio/dead.mp3";

let eat = new Audio();
eat.src = "audio/eat.mp3";

//food
let food = {
	x : Math.floor(Math.random()*17 + 1) * box,
	y : Math.floor(Math.random()*15 + 3) * box
}

//snake
let snake = [];
snake[0] = {
	x : 9 * box,
	y : 10 * box
}

//score
let score = 0;


let d;

//event listener
document.addEventListener("keydown",direction);

//event handler
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

//collision
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

//draw
function draw(){
    //ground
	ctx.drawImage(groundImg,0,0);

	//snake
	for(let i = 0; i < snake.length; i++){
		ctx.fillStyle = (i == 0) ? "green" : "white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}


	//food
	ctx.drawImage(foodImg,food.x,food.y);

	//logic

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    //movement
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    //snake eats the food
   if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        //don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
    	clearInterval(game);
    	dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,150);
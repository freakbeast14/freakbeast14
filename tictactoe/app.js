//game variables
let gameIsLive = true;
let xIsNext = true;

//HTML elements
const status = document.querySelector('.game-status');
const reset = document.querySelector('.game-reset');
const cells = document.querySelectorAll('.game-cell');

//functions
function checkWinner(letter){
	gameIsLive = false;
	if(letter === 'x'){
			status.innerHTML = `<b>X</b> HAS WON!`;
		}
		else{
			status.innerHTML = `<span><b>O</b> HAS WON!</span>`;
		}
}

function CheckGameStatus(){
	const tl = cells[0].classList[2];
	const tm = cells[1].classList[2];
	const tr = cells[2].classList[2];
	const ml = cells[3].classList[2];
	const mm = cells[4].classList[2];
	const mr = cells[5].classList[2];
	const bl = cells[6].classList[2];
	const bm = cells[7].classList[2];
	const br = cells[8].classList[2];

	//check winner
	//horizontal winner
	if(tl && tl === tm && tm === tr){
		cells[0].classList.add('green');
		cells[1].classList.add('green');
		cells[2].classList.add('green');
		checkWinner(tl);
	}
	else if(ml && ml === mm && mm === mr){
		cells[3].classList.add('green');
		cells[4].classList.add('green');
		cells[5].classList.add('green');		
		checkWinner(ml);
	}
	else if(bl && bl === bm && bm === br){
		cells[6].classList.add('green');
		cells[7].classList.add('green');
		cells[8].classList.add('green');	
		checkWinner(bl);
	}
	//vertical winner
	else if(tl && tl === ml && ml === bl){
		cells[0].classList.add('green');
		cells[3].classList.add('green');
		cells[6].classList.add('green');	
		checkWinner(tl);
	}
	else if(tm && tm === mm && mm === bm){
		cells[1].classList.add('green');
		cells[4].classList.add('green');
		cells[7].classList.add('green');
		checkWinner(tm);
	}
	else if(tr && tr === mr && mr === br){
		cells[2].classList.add('green');
		cells[5].classList.add('green');
		cells[8].classList.add('green');	
		checkWinner(tr);
	}
	//diagonal winner
	else if(tl && tl === mm && mm === br){
		cells[0].classList.add('green');
		cells[4].classList.add('green');
		cells[8].classList.add('green');		
		checkWinner(tl);
	}
	else if(tr && tr === mm && mm === bl){
		cells[2].classList.add('green');
		cells[4].classList.add('green');
		cells[6].classList.add('green');		
		checkWinner(tr);
	}
	//check draw
	else if(tl && tm && tr &&
		    ml && mm && mr &&
		    bl && bm && br){
		gameIsLive = false;
	    status.innerHTML = `<b>GAME <span>IS</span> TIED!</b>`;
	}
	//game continues
	else{
		xIsNext = !xIsNext;
		if(xIsNext){
			status.innerHTML = `<b>X</b> IS NEXT`;
			
		}
		else{
		    status.innerHTML = `<span><b>O</b> IS NEXT</span>`;	
		    
		}
	}

}

//event handlers
const handleReset = () => {
	xIsNext = true;
	status.innerHTML = `<b>X</b> IS FIRST`;
	gameIsLive = true;
	for(const cell of cells){
		cell.classList.remove('x');
		cell.classList.remove('x-hover');
		cell.classList.remove('o');
		cell.classList.remove('o-hover');
		cell.classList.remove('green');
	}
}

const handleCellClick = (e) => {
const ClassList = e.target.classList;

if(!gameIsLive || ClassList.contains('x')  || ClassList.contains('o')){
	return;
}

if(xIsNext){
	ClassList.add('x');
	ClassList.remove('x-hover');
	CheckGameStatus();
}
else{
	ClassList.add('o');
	ClassList.remove('o-hover');
	CheckGameStatus();
}
}

const handleCellMouseOver = (e) => {
const ClassList = e.target.classList;

if(!gameIsLive || ClassList.contains('x')  || ClassList.contains('o')){
	return;
}

if(xIsNext){
	ClassList.add('x-hover');
}
else{
	ClassList.add('o-hover');
}
}

const handleCellMouseOut = (e) => {
const ClassList = e.target.classList;

if(!gameIsLive || ClassList.contains('x')  || ClassList.contains('o')){
	return;
}

if(ClassList.contains('x-hover')){
	ClassList.remove('x-hover');
}
if(ClassList.contains('o-hover')){
	ClassList.remove('o-hover');
}
}

//event listeners
reset.addEventListener('click',handleReset);

for( const cell of cells)
{
	cell.addEventListener('click', handleCellClick);
	cell.addEventListener('mouseover', handleCellMouseOver);
	cell.addEventListener('mouseout', handleCellMouseOut);
}

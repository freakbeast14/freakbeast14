//html elements
const input = document.querySelector(".input");
const operation_value = document.querySelector(".operation .value");
const result_value = document.querySelector(".result .value");

//buttons array
const calc_btns = [
	{
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },
    {
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },
    {
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },
    {
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },
    {
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },
    {
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },
    {
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },
    {
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },
    {
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },
    {
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },
    {
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },
    {
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },
    {
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];

//add buttons
function addButtons(){
	const btns_per_row = 4;
	let added_btns = 0;

	calc_btns.forEach(button => {

		if(added_btns % btns_per_row == 0){
			input.innerHTML += `<div class="row"></div>`;
		}

		const row = document.querySelector(".row:last-child");
		row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
		added_btns++;
	});
}

//call addButtons function
addButtons();

//event listener to buttons
input.addEventListener("click", event => {

	const trg = event.target;

	calc_btns.forEach(button => {

		if(button.name == trg.id){
			calculator(button);
		}
	});
});

let data = {
	operation : [],
	result : []
}

function calculator(button){

	if(button.type == "number"){
		data.operation.push(button.symbol);
		data.result.push(button.formula);
	}

	else if(button.type == "operator"){
		data.operation.push(button.symbol);
		data.result.push(button.formula);
	}

	else if(button.type == "key"){
		if(button.name == "clear"){
			data.operation = [];
			data.result = [];
			updateResultOperation(0);
		}
		else if(button.name == "delete"){
			data.operation.pop();
			data.result.pop();
		}
	}

	else if(button.type == "calculate"){
		const str = data.result.join('');
		//console.log(str);
		data.operation = [];
		data.result = [];


    	let res;

		try{
		res = eval(str);
		//console.log(res);
		}
		catch(e){
			if(e instanceof SyntaxError){
				res = "Syntax Error!";
				result_value.innerHTML = res;
				//console.log(res);
				return;
			}
		}

		res = format(res);

		data.result.push(res);
		data.operation.push(res);

		updateResultOperation(res);

		return;
	}
	updateOutputOperation(data.operation.join(''));
}

function updateOutputOperation(str){

	operation_value.innerHTML = str;

}

function updateResultOperation(str){

    result_value.innerHTML = str;
}

function format(str){

	const max_num_length = 10;
	const prec = 5;

	if(str.toString().length > max_num_length){
		if(isFloat(str)){
			const int_part = parseInt(str);
			if(int_part.toString().length > max_num_length){
				return str.toPrecision(prec);
			}
			else{
				const decimals = max_num_length - int_part.toString().length;
				return str.toFixed(decimals);
			}
		}
		else{
			return str.toPrecision(prec);
		}
	}
	else{
		return str;
	}
}

function isFloat(num){
	return num%1!=0;
}
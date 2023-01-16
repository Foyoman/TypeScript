"use strict";
let age2;
age2 = 30;
const userName2 = 'Maximilian';

console.log(userName2);

let appId = 'abc'
const button = document.querySelector('button')!;

function add3(n1: number, n2: number) {
	if (n1 + n2 > 0) {
		return n1 + n2;
	}
	return;
}

function clickHandler(message: string) {
	// let userName = 'Max';
	console.log('Clicked! ' + message)
}

// a comment
if (button) {
	button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}

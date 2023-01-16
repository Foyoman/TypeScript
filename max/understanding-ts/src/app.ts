const userName3 = 'Max';
// username = 'Maximilian';
let age3 = 30;

age3 = 29;

// function add4(a: number, b: number) {
// 	let result;
// 	result = a + b;
// 	return result;
// }

// if (age3 > 20) {
// 	let isOld = true;
// }

// console.log(isOld);

// const add4 = (a: number, b: number = 1) => a + b;

// console.log(add4(2, 5));

// const printOutput: (a: number | string) => void = output => console.log(output);

// const button2 = document.querySelector('button');

// if (button2) {
// 	button2.addEventListener('click', event => console.log(event));
// }

// printOutput(add4(5))

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

const person2 = {
	firstName: 'Max',
	age: 30,
};

const copiedPerson = { ...person2 };

const add4 = (...numbers: number[]) => {
	return numbers.reduce((curResult, curValue) => {
		return curResult + curValue;
	}, 0);
};

const add5 = (...numbers: [number, number, number]) => {
	return numbers.reduce((curResult, curValue) => {
		return curResult + curValue;
	}, 0);
};

const addedNumbers = add4(5, 10, 2, 3.7);
const addedTuple = add5(5, 10, 2);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

const { firstName: userName4, age } = person2;

console.log(userName4, age, person2);
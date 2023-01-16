function add2(n1: number, n2: number) {
	return n1 + n2;
}

function printResult2(num: number): undefined {
	console.log('Result: ' + num);
	return;
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}

printResult2(add2(5, 12));

let combineValues: (a: number, b: number) => number;

combineValues = add2;
// combineValues = printResult2;
// combineValues = 5;

console.log(combineValues(8, 8)) // => 16

// let someValue: undefined;

addAndHandle(10, 20, (result) => {
	console.log(result);
});
// Function type expressions //////////////////////////////////////
function greeter(fn: (a: string) => void) {
	fn("Hello, World");
}

function printToConsole(s: string) {
	console.log(s);
}

greeter(printToConsole);

type GreetFunction = (a: string) => void; 
function greeter2(fn: GreetFunction) {
	// ...
}

// Call signatures ////////////////////////////////////////////////
type DescribableFunction = {
	description: string;
	(someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
	console.log(fn.description + " returned " + fn(6));
}

// Construct signatures ///////////////////////////////////////////
type SomeConstructor = {
	new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
	return new ctor("hello");
}

interface CallOrConstruct {
	new (s: string): Date;
	(n?: number): number;
}

// Generic functions //////////////////////////////////////////////
// function firstElement(arr: any[]) {
// 	return arr[0];
// }

function firstElement<Type>(arr: Type[]): Type | undefined {
	return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number
const n = firstElement([1, 2, 3]);
// u is of type undefined 
const u = firstElement([]);

// Inference //////////////////////////////////////////////////////
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
	return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// Constraints ////////////////////////////////////////////////////
function longest<Type extends { length: number }>(a: Type, b: Type) {
	if (a.length >= b.length) {
		return a;
	} else {
		return b;
	}
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);

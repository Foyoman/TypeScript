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


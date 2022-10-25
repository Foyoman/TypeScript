// any ////////////////////////////////////////////////////////////
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is 
// assumed you know the environment better than TypeScript
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

// Functions //////////////////////////////////////////////////////
// Type annotations on variables
// let myName: string = "Alice";
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";

// Parameter type annotation 
function greet(name: string) {
	console.log("Hello, " + name.toUpperCase() + "!!");
}

// Return type annotations
function getFavoriteNumber(): number {
	return 26;
}

// Anonymous functions
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
	console.log(s.toUppercase());
});

// Contextual typing also applies to arrow functions 
names.forEach((s) => {
	console.log(s.toUppercase());
});

// Object types ///////////////////////////////////////////////////
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
	console.log("The coordinate's x value is " + pt.x);
	console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// Optional properties
function printName(obj: { first: string; last?: string }) {
	// Error - might crash if 'obj.last' wasn't provided!
	console.log(obj.last?.toUpperCase());
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// Union types ////////////////////////////////////////////////////
function printId(id: number | string) {
	if (typeof id === "string") {
		// In this branch, id is of type 'string'
		console.log(id.toUpperCase());
	} else {
		// Here, id is of type 'number'
		console.log(id);
	}
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myId: 22342 });

function welcomePeople(x: string[] | string) {
	if (Array.isArray(x)) {
		// Here: 'x' is 'string[]'
		console.log("Hello, " + x.join(" and "));
	} else {
		// Here: 'x' is 'string'
		console.log("Welcome lone traveler " + x);
	}
}

// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
	return x.slice(0, 3);
}

// Type aliases ///////////////////////////////////////////////////
type Point = {
	x: number;
	y: number;
};

// Exactly the same as the earlier example
function printCoord2(pt: Point) {
	console.log("The coordinate's x value is " + pt.x);
	console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

type ID = number | string;

declare function getInput(): string;
declare function sanitize(str: string): string;
// ---cut---
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
	return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = "new input";

// Interfaces /////////////////////////////////////////////////////
interface Point2 {
	x: number;
	y: number;
}

function printCoord3(pt: Point2) {
	console.log("The coordinate's x value is " + pt.x);
	console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

// Extending an interface
interface Animal {
	name: string
}

interface Bear extends Animal {
	honey: boolean
}

// Extending a type vis intersections 
type AnimalType = {
	name: string
}

type Beat = Animal & {
	honey: boolean
}

// Adding new fields to an existing interface
interface Window {
	title: string
}

interface Window {
	ts: TypeScriptAPI
}

const src = 'const a = "helloWorld';
window.ts.transpileModule(src, {});

// A type cannot be changed after being created
type WindowType = { 
	title: string
}

type Window = {
	ts: TypeScriptAPI
}

// Type assertions ////////////////////////////////////////////////
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

const x = "hello" as number;

declare const expr: any;
type T = { a: 1; b: 2; c: 3 };
// ---cut---
const a = (expr as any) as T;

// Literal types //////////////////////////////////////////////////
let changingString = "Hello World";
changingString = "Hola Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, 
// it has a literal type representation
constantString;

let y: "hello" = "hello";
// OK
y = "hello";
// ... 
y = "howdy";

function printText(s: string, alignment: "left" | "right" | "center") {
	// ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");

function compare(a: string, b: string): -1 | 0 | 1 {
	return a === b ? 0 : a > b ? 1 : -1;
}

interface Options {
	width: number;
}
function configure(x: Options | "auto") {
	// ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");

// Literal interface
declare const someCondition: boolean;
// ---cut---
const obj = { counter: 0 };
if (someCondition) {
	obj.counter = 1;
}

// @errors: 2345
declare function handleRequest(url: string, method: "GET" | "POST"): void;
// ---cut---
const req = { url: "https://example.com", method: "GET" as const };
handleRequest(req.url, req.method);

function doSomething(x: string | null) {
	if (x === null) {
		// do nothing
	} else { 
		console.log("Hello, " + x.toUpperCase());
	}
}

// Non-null assertion operator (postfix !)
function liveDangerously(x?: number | null) {
	// No error
	console.log(x!.toFixed());
}

// Less common primitives
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;

// symbol
const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {
	// Can't ever happen
}
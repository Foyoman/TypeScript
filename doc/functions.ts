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

function minimumLength<Type extends { length: number }>(
	obj: Type,
	minimum: number
): Type {
	if (obj.length >= minimum) {
		return obj;
	} else {
		return { length: minimum };
	}
}

// Specifying type arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
	return arr1.concat(arr2);
}

const arr1 = combine([1, 2, 3], ["hello"]);
const arr2 = combine<string | number>([1, 2, 3], ["hello"]);

// Guidelines for writing good generic functions
// Push type parameters down

function firstElement1<Type>(arr: Type[]) {
	return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
	return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);

// Use fewer type parameters
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
	return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
	arr: Type[],
	func: Func // bad
): Type[] {
	return arr.filter(func);
}

// Type parameters should appear twice
function greet<Str extends string>(s: Str) { 
	console.log("Hello, " + s);
}

greet("world");

function greet2(s: string) {
	console.log("Hello, " + s);
}

// Optional parameters
function f(n: number) {
	console.log(n.toFixed()); // 0 arguments
	console.log(n.toFixed(3)); // 1 argument
}

function f2(x?: number) {
	// ...
}
f2(); // OK
f2(10); // OK

declare function f3(x?: number): void;
// cut
// All OK
f3();
f3(10);
f3(undefined);

// Optional parameters in callbacks
function myForEeach(arr: any[], callback: (arg: any, index?: number) => void) {
	for (let i = 0; i < arr.length; i++) {
		callback(arr[i], i);
	}
}

myForEeach([1, 2, 3], (a) => console.log(a));
myForEeach([1, 2, 3], (a, i) => console.log(a, i));

function myForEach2(arr: any[], callback: (arg: any, index?: number) => void) {
	for (let i = 0; i < arr.length; i++) {
		// I don't feel like providing the index today
		callback(arr[i]);
	}
}

myForEach2([1, 2, 3], (a, i) => {
	console.log(i.toFixed());
});

// Function overloads /////////////////////////////////////////////
function makeDate(timeStamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
	if (d !== undefined && y !== undefined) {
		return new Date(y, mOrTimestamp, d);
	} else {
		return new Date(mOrTimestamp);
	}
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// Overload signatures and the implementation signature
function fn2(x: string): void;
function fn2() {
	// ...
}
// Expected to be able t ocall with zero arguments
fn2();

function fn3(x: boolean): void;
// Argument type isn't right
function fn3(x: string): void;
function fn3(x: boolean) {}

function fn4(x: string): string;
function fn4(x: number): boolean;
function fn4(x: string | number) {
	return "oops";
}

// Writing good overloads
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
	return x.length;
}

len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);

function len2(x: any[] | string) {
	return x.length;
}

// Declaring this in a function
const user = {
	id: 123,

	admin: false,
	becomeAdmin: function () {
		this.admin = true;
	},
};

interface User {
	id: number;
	admin: boolean;
}
declare const getDB: () => DB;
// ---cut---
interface DB {
	filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins1 = db.filterUsers(function (this: User) {
	return this.admin;
});

const admins2 = db.filterUsers(() => this.admin);

// Other types to know about //////////////////////////////////////
// void
// The inferred return type is void
function noop() {
	return;
}

// unknown
function f1(a: any) {
	a.b(); // OK
}
function f2(a: unknown) {
	a.b();
}

declare const someRandomString: string;
// ---cut---
function safeParse(s: string): unknown {
	return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);

// never
function fail(msg: string): never {
	throw new Error(msg);
}

function fn5(x: string | number) {
	if (typeof x === "string") {
		// do something
	} else if (typeof x === "number") {
		// do something else
	} else {
		x; // has type 'never'!
	}
}

// Function
function doSomething2(f: Function) {
	return f(1, 2, 3);
}

// Rest parameters and arguments //////////////////////////////////
// Rest parameters
function multiply(n: number, ...m: number[]) {
	return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a2 = multiply(10, 1, 2, 3, 4);

// Rest arguments
const arr3 = [1, 2, 3];
const arr4 = [4, 5, 6];
arr3.push(...arr4);

// Inferred type is number[] -- "an array with zero or more numbers"
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
// Inferred as 2-length tuple
const args2 = [8, 5] as const;
// OK
const angle2 = Math.atan2(...args);

// Parameter destructuring
function sum1({ a, b, c }) {
	console.log(a + b + c);
}
sum1({ a: 10, b: 3, c: 9 });

function sum2({ a, b, c }: { a: number; b: number; c: number }) {
	console.log(a + b + c);
}

// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum3({ a, b, c }: ABC) {
	console.log(a + b + c);
}

// Assignability of functions 
type voidFunc = () => void;

const f4: voidFunc = () => {
	return true;
};

const f5: voidFunc = () => true;

const f6: voidFunc = function () {
	return true;
};

const v1 = f4();

const v2 = f5();

const v3 = f6();

const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));

function f7(): void {
	// @ts-expect-error
	return true;
}

const f8 = function (): void {
	// @ts-expect-error
	return true;
};
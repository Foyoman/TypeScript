function padLeft(padding: number | string, input: string) {
	if (typeof padding === "number") {
		return " ". repeat(padding) + input;
	}
	return padding + input;
}

// typeof type guards /////////////////////////////////////////////
function printAll(strs: string | string[] | null) {
	if (typeof strs === "object") {
		for (const s of strs) {
			console.log(s);
		}
	} else if (typeof strs === "string") {
		console.log(strs);
	} else {
		// do nothing
	}
}

// Truthiness narrowing ///////////////////////////////////////////
function getUsersOnlineMessage(numUsersOnline: number) {
	if (numUsersOnline) {
		return `There are ${numUsersOnline} online now!`;
	}
	return "Nobody's here. :(";
}

// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true, value: true

function printAll(strs: string | string[] | null) {
	if (strs && typeof strs === "object") {
		for (const s of strs) {
			console.log(s);
		}
	} else if (typeof strs === "string") {
		console.log(strs);
	}
}

function multiplyAll(
	values: number[] | undefined,
	factor: number
): number[] | undefined {
	if (!values) {
		return values;
	} else {
		return values.map((x) => x * factor);
	}
}

function printAll2(strs: string | string[] | null) {
	// !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
	if (strs) { 
		if (typeof strs === "object") {
			for (const s of strs) {
				console.log(s);
			}
		} else if (typeof strs === "string") {
			console.log(strs);
		}
	}
}

// Equality narrowing /////////////////////////////////////////////
function example(x: string | number, y: string | boolean) {
	if (x === y) {
		// We can now call any 'string' method on 'x' or 'y'.
		x.toUpperCase();
		y.toLowerCase();
	} else {
		console.log(x);
		console.log(y);
	}
}

function printAll3(strs: string | string[] | null) {
	if (strs !== null) {
		if (typeof strs === "object") {
			for (const s of strs) {
				console.log(s);
			}
		} else if (typeof strs === "string") {
			console.log(strs);
		}
	}
}

interface Container {
	value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
	// Remove both 'null' and 'undefined' from the type.
	if (container.value != null) {
		console.log(container.value);

		// Now we can safely multiply 'container.value'.
		container.value *= factor;
	}
}

// The in operator narrowing //////////////////////////////////////
type Fish = { swim: () => void; name: string };
type Bird = { fly: () => void; name: string };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
	if ("swim" in animal) {
		return animal;
	}

	return animal;
}

// instanceof narrowing ///////////////////////////////////////////
function logValue(x: Date | string) {
	if (x instanceof Date) {
		console.log(x.toUTCString());
	} else {
		console.log(x.toUpperCase());
	}
}

// Assignments ////////////////////////////////////////////////////
let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;
console.log(x);
x = "goodbye!";
console.log(x);

let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;
console.log(x);
x = true;
console.log(x);

// Control flow analysis //////////////////////////////////////////
function padLeft2(padding: number | string, input: string) {
	if (typeof padding === "number") {
		return " ".repeat(padding) + input;
	}
	return padding + input;
}

function example() {
	let x: string | number | boolean;
	x = Math.random() < 0.5;
	console.log(x);

	if (Math.random() < 0.5) {
		x = "hello";
		console.log(x);
	} else {
		x = 100;
		console.log(x);
	}

	return x;
}

// Using type predicates //////////////////////////////////////////
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
	pet.swim();
} else {
	pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
	if (pet.name === "sharkey") return false;
	return isFish(pet);
});

// Discriminated unions ///////////////////////////////////////////
// interface Shape {
// 	kind: "circle" | "square";
// 	radius?: number;
// 	sideLength?: number;
// }

function handleShape(shape: Shape) {
	// oops!
	if (shape.kind === "rect") {
		// ...
	}
}

interface Circle {
	kind: "circle";
	radius: number;
}

interface Square {
	kind: "square";
	sideLength: number;
}

// Exhaustiveness checking 
interface Triangle {
	kind: "triangle";
	sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius ** 2;
		case "square":
			return shape.sideLength ** 2;
		default: 
		const _exhaustiveCheck: never = shape;
		return _exhaustiveCheck;
	}
}

// Object types ///////////////////////////////////////////////////
function greet1(person: { name: string; age: number }) {
	return "Hello " + person.name;
}

interface Person {
	name: string;
	age: number;
}

function greet2(person: Person) {
	return "Hello " + person.name;
}

// Property modifiers /////////////////////////////////////////////
// Optional properties
interface Shape {}
declare function getShape(): Shape;

// ---cut---
interface PaintOptions {
	shape: Shape;
	xPos?: number;
	//  ^
	yPos?: number;
	//  ^
}

function paintShape(opts: PaintOptions) {
	// ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

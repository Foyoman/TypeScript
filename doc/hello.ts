function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());

let msg = "hello there!"; // inference

// tsc --noEmitOnError hello.ts
// tsc --target es2015 hello.ts
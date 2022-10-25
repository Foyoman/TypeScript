function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
// tsc --noEmitOnError hello.ts
// tsc --target es2015 hello.ts

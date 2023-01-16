"use strict";
const userName3 = 'Max';
let age3 = 30;
age3 = 29;
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
const person2 = {
    firstName: 'Max',
    age: 30,
};
const copiedPerson = Object.assign({}, person2);
const add4 = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const add5 = (...numbers) => {
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
//# sourceMappingURL=app.js.map
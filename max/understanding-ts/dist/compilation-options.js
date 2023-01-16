"use strict";
let age2;
age2 = 30;
const userName2 = 'Maximilian';
console.log(userName2);
let appId = 'abc';
const button = document.querySelector('button');
function add3(n1, n2) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}
function clickHandler(message) {
    console.log('Clicked! ' + message);
}
if (button) {
    button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}
//# sourceMappingURL=compilation-options.js.map
// New String and Array methods introduced in ES6

// String.includes(), String.startsWith() and String.endsWith()
var text = "Prima zi de internship";

console.log(text.includes("zi") ? "Textul contine 'zi'." : "Textul nu contine 'zi'.");
console.log(text.startsWith("A doua") ? "Este a doua zi de internship" : "Nu este a doua zi de internship");
console.log(text.endsWith("intership") ? "String-ul se termina cu 'interhship'" : "String-ul nu se termina cu 'internship'");

// Array methods. .from(), .keys(), .find()...
var limbaj = "JAVASCRIPT";
// We split the string into an array
var limbajArr = Array.from(limbaj);

console.log("Array.from():", limbajArr);

// We visualize the key-value pairs within the resulting array
for (let key of limbajArr.keys())
{
    console.log(key, "->", limbajArr[key]);
}

// The Array.find() method
console.log(limbajArr.find(letter => letter === 'J') ? "Array-ul contine valoarea 'J'" : "Array-ul nu contine valoare 'J'");

// We use both Array.find() and Array.indexOf() methods in order to determine the position of the 'R' element, if it exists (desi eu stiu ca exista :) )
if(limbajArr.find(letter => letter === 'R'))
{
    let indexOfR = limbajArr.findIndex(letter => letter === 'R');
    console.log("In array exista un element cu valoarea 'R', acesta aflandu-se pe pozitia", indexOfR);
}


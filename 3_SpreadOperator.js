// JS spread operator

const add = (a, b, c) => {
    return a + b + c;
}

let numbers = [13, 5, 9];
let result;

// result = add(numbers); // This gives a bad result
result = add(...numbers); // Using the spread operator here allows JS to read the elements of the numbers array as separate function arguments

console.log(result);

// The spread operator can also be used in order to copy the content of an array to another (without also referencing the first array) or if we want to concatenate arrays
let first = ['Javascript', 'Angular', 'NodeJS'];

// If we do the following, the original array will also be modified
/*
    let second = first;
    second.push('React'); 
    console.log(first); // => [ 'Javascript', 'Angular', 'NodeJS', 'React' ]
*/

// Instead, we can do the following in order to both copy the contents of the original array and directly append another element to it
let second = [...first, 'React'];
console.log(second);
console.log(first);

// We can also concatenate 2 arrays
let third = ['Django', '.NET Core'];
let fourth = [...second, ...third];
console.log(fourth);
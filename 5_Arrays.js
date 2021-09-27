// arrays - accesor, iteration, mutator methods
let zarva = [1, 'Javascript', {name: 'Marian', age: 23}, [1, 2, 3], 'Ultimul element'];

// To access array elements, we can use [index]
console.log(zarva[0]); // -> 1, first element of the array
zarva[0] = 2;
console.log(zarva[0]); // -> 2, first element of the array

// Different methods of accessing the last element
console.log(zarva[zarva.length - 1]); // -> Ultimul element, last element of the array
console.log(zarva.slice(-1)[0]); // -> Ultimul element, last element of the array

// Another way of obtaining the value of the last element is by using the .pop() method, which removes and returns the last element from the array
console.log(zarva.pop()); // Array becomes -> [1, 'Javascript', {name: 'Marian', age: 23}, [1, 2, 3]]

// Iteration methods
console.log('Standard iteration method');
for (let i = 0; i < zarva.length; i++)
{
    console.log(zarva[i]);
}

console.log('For... of method');
for (let element of zarva)
{
    console.log(element);
}

console.log('Array.forEach() callback method');
zarva.forEach(element => {
    console.log(typeof element === 'number' ? "The element was a number!" : element); // If the element is a number, we print a message instead
});

// Methods like map, reduce, filter etc. do not mutate the original array, instead returning a resulting array.
// Meanwhile, methods like sort, reverse, pop and push do modify the original array
console.log();
console.log(zarva.filter(element => typeof element === 'string')); // this returns an array containing only the strings within the original array
console.log();
let numbers = [10, 15, 7, 4];
console.log(numbers.map(number => number *= number)); // All numbers are squared

console.log();
console.log(numbers.map(number => number *= number).reduce((a, b) => a + b)); // The sum of all numbers squared

// Mutator methods
console.log();
// If we want to add another element to the array, we can use the .push() method which mutates the array
numbers.push(23); // This adds the element to the end of the array
console.log(numbers);
numbers.shift(); // This method removes and returns the first element of the array
console.log(numbers);

console.log();
console.log(numbers.sort()); // The sort() method is intended for strings; this will not work correctly for numbers
console.log(numbers.sort((a, b) => a -b)); // But this will work for numbers
// And if we want to reverse it:
numbers.reverse();
console.log(numbers);

// If we want to completely remove elemnts from an array, we can use the Array.splice() method
numbers.splice(2,1); // This will remove 1 element from the array, starting from position 2
console.log(numbers);
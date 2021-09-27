// Object iteration and deep copies

const weekdays = {
    monday: {
        start: 9,
        end: 17,
        tasks: ['Coding', 'Debugging']
    },
    tuesday: {
        start: 9,
        end: 17
    },
    wednesday: {
        start: 9,
        end: 17
    },
    thursday: {
        start: 9,
        end: 17
    },
    friday: {
        start: 9,
        end: 17,
        tasks: ['Feedback meeting']
    },
    saturday: 'No work!',
    sunday: 'No work!'
};
console.log('For... in');
for (const day in weekdays) {
    console.log('Day', day, '->', weekdays[day]);
}

console.log();
console.log('Object.entries() method:')
// Another way of iterating through the week days is by using the Object.entries() method. This is similar to the python dictionaries method of iteration
for (const [day, schedule] of Object.entries(weekdays)) {
    console.log('Day', day, '->', schedule);
}
console.log();
// Deep copying objects. Unfortunately (or not? depends), the spread operator from the previous chapter should not be used to copy nested objects/arrays
// const test = {...weekdays};
// Instead, a simple trick to deep clone an object in order to treat it as a completely separate one from the original is to 
// convert the object into JSON format and then restore it; although this method has some drawbacks as some values can be lost.
let jsonified = JSON.stringify(weekdays);
const deepCopy = JSON.parse(jsonified);
deepCopy.monday.tasks.push('Morning Meeting');
console.log(deepCopy);
// console.log(weekdays);

// This way, we were able to modify one of the objects without affecting the original one
console.log();
// If we use the spread operator instead, the original object still gets modified, as demonstrated below:
const spreadCopy = {...weekdays};
spreadCopy.tuesday.tasks = ['Coding'];
console.log("The original object after modifying a shallow copy:")
console.log(weekdays);
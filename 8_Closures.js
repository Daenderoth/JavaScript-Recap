// Closures
// A practical example of using closures in order to make some sort of function creator to remove different letters from strings

const removeLettersFromString = (letters) => {
    return (sentence) => 
    {
        return sentence.replace(letters, '');
    }
}

// We use the original function to build other functions
const removeA = removeLettersFromString(/a/g); // Also works with regular expressions. In this way, all of the occurences of the letter are removed.
const removeB = removeLettersFromString(/b/g);
const removeLitere = removeLettersFromString("litere");

let prop = "Va rog sa nu scoateti litere din propozitie, intrucat nu va mai avea sens.";

console.log(removeA(prop));
console.log(removeLitere(prop));
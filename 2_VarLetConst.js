// Studying the differences between var, const and let declarations

// Advantages of let over var

var x = 1;
var condition = true;

if(condition)
{
    var x = 2;
}

console.log(x); // In this example, the variable x is redefined even though it is within the scope of another block, which may sometimes lead to unwanted results.
// Instead, we can use the 'let' keyword if we want to avoid variable redeclaration.

let y = 'ziua';
if(condition)
{
    let y = 'Buna';
    console.log(y);
}
console.log(y);

// In contextul actual, ambele declaratii ale lui y sunt tratate ca instante separate, deoarece exista in scopes diferite. Daca vrem, insa, sa schimbam valoarea
// originala a lui y, putem proceda astfel

if(condition)
{
    y = 'Buna';
}
console.log(y);


// const vs. let

let greeting = 'Hello';
const salut = 'Buna ziua';

greeting = 'Hello world';
// salut = 'Hello'; // Aceasta variabila nu se schimba. Exact ca oamenii.
// JS nu ne lasa nici sa o redeclaram, nici sa ii schimbam valoarea.
// Insa, daca ar fi un obiect mai complex, i-am putea modifica valorile proprietatilor;
console.log(greeting);
console.log(salut);

// Exemplu in care un obiect declarat cu 'const' este modificat
const person = {name: 'Iulian', age: 23};
console.log(person);
person.name = 'Florian';
console.log(person);
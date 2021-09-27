// Promises - obiecte ce reprezinta terminarea unui task asincron, alaturi de status si valoare rezultanta. Asemanator cu async/await 

// Algoritmul meu pentru procesarea cererilor de angajare
const angajare = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random() > 0.5)
        {
            resolve('Te angajam.');
        }
        else 
        {
            reject('Nu te angajam.')
        }
        
    }, 2000);
});

angajare
    .then((raspuns) => {
        console.log(raspuns);
    })
    .catch((rejection) => {
        console.log(rejection);
    })
    .finally(() => {
        console.log('Procesul de recrutare s-a incheiat.');
    });
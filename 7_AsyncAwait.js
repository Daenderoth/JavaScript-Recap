// Async/await keywords
// Voi recrea exemplul anterior, insa, de data aceasta, folosind async si await

const startProcesDeAngajare = async () => {

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

    try {
        let raspuns = await angajare; // Keyword-ul 'await' opreste executia codului pana in momentul in care Promise-ul este rezolvat
        console.log(raspuns);
    } 
    catch (error) { // Se executa codul de aici doar in cazul in care Promise-ul este rejected. Trebuie prinsa eroarea.
        console.log(error);
    }
    finally {
        console.log('Procesul de recrutare s-a incheiat.');
    }
    
}

startProcesDeAngajare();
import '../css/index.css';

import { promesaLenta, promesaMedia, promesaRapida } from './promises';
import { forAwait, promesasResueltas, buscarHeroeAsync, obtenerArrHeroes, obtenerArrHeroesOptimizado, obtenerArrHeroesOptimizado2, obtenerHeroesAsync } from './async-await';

/* promesaLenta().then(console.log);
promesaMedia().then(console.log);
promesaRapida().then(console.log); */

// La promesa mas rapida en cumplirse dispara su respuesta, mientras que las demas ya no 
// (sin importan si marcan error o no):

// El promise.race devuelve una respuesta tan pronto como una promesa falle o termine con exito.
Promise.race([promesaLenta(), promesaMedia(), promesaRapida()])
            .then()
            .catch(console.error);



// CASO DE USO:

// Si fetch no regresa algo antes que pase 5 segundos, la promesa del error se disparara:

var p = Promise.race([
    new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve('Se encontro con exito!');
        }, 6000)
    }),
    new Promise(function (resolve, reject) {
         setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]).then(response => console.log(response)).catch(error => console.log())
/* En este caso, si la petición fetch no retorna antes de los 5 segundos sera descartada y se retornara 
   la instancia de la promesa del setTimeout.*/

/* 
buscarHeroeAsync('capi').then(res => console.log(res.nombre));  */

Promise.all([buscarHeroeAsync('capi'), buscarHeroeAsync('iron')]).then(heroes => {
    heroes.forEach(heroe => {
        console.log(heroe.nombre);
    });
}).catch(err => console.warn(err));

console.time('await');

obtenerHeroesAsync('capi2').then(heroe => {
    // Gracias al await, esperamos que las promesas se resuelvan.
    console.log(heroe);

    console.timeEnd('await')
}).catch( err => console.warn(err));

promesasResueltas().then(console.table)

forAwait();






import { buscarHeroe } from './callbacks';
import { buscarHeroe as buscarHeroePromise} from './promises';


const id1 = 'capi';
const id2 = 'iron';
const id3 = 'spider';
const id4 = 'hulk';
const id5 = 'ant';
const id6 = 'tati';

/* buscarHeroe('iron2', (heroe) => {
    if (heroe) console.log(`Hola ${heroe.nombre}, tienes el poder de ${heroe.poder}`);
    else return console.error('Algo salio mal');
}); */

// <========== Argumentos estandar de los callback's ==========>
// El 'err' es un estandar en un callback.
// Los callback primitivos son sincronos.

// <========== Callback hell (anidacion de codigo) ==========>
buscarHeroe(id2, (err, heroe1) => {
    if (err) return console.error(err);
    
    buscarHeroe(id2, (err, heroe2) => {
        if (err) return console.error(err);

        buscarHeroe(id2, (err, heroe3) => {
            if (err) return console.error(err);

            buscarHeroe(id3, (err, heroe4) => {
                if (err) return console.error(err);

                buscarHeroe(id4, (err, heroe5) => {
                    if (err) return console.error(err);
                    /* console.log(`Mandando a la batalla a: ${heroe1.nombre}, ${heroe2.nombre}, ${heroe3.nombre}, ${heroe4.nombre} y ${heroe5.nombre}`); */
                });
            });
        });
    });
});

// PROMESAS:

/* Las promesas fueron una inclusion en el ECS6 para poder mejorar la codificacion de callbacks anidados. */
// Las promesas se manejan de manera asincrona (manejado por el event loop).
// Y es por eso, que las promesas son mas eficientes para el manejo de respuestas y errores al hacer 
// peticiones, ya que estan manejadas de manera asicrona con las demas lineas de codigo del script.

// El argumento manejado en el callback de then es el objeto encontrado o la respuesta en la promesa:
// Pero de todas maneras se generaria un codigo feo....
buscarHeroePromise(id1).then((obj1) => {
    /* console.log(`Mandando a la mision a ${obj.nombre}.`) */
    buscarHeroePromise(id2).then((obj2) => {
        /* console.log(`Mandando a la mision a ${obj2.nombre} y ${obj1.nombre}.`); */
    });
});

// A menos que usemos Promise.all:
/* Promise.all([buscarHeroePromise(id1), buscarHeroePromise(id2)]).then(([heroe1, heroe2]) => {
    console.log(`Mandando a la mision a ${heroe1.nombre} y ${heroe2.nombre}.`);
}); */

console.log('Hola mundo1');

Promise.all([buscarHeroePromise(id1), buscarHeroePromise('id2')]).then((heroes) => {
    // Solo se ejecuta este callback si todas las acciones de la promesa se cumplen con exito:
    heroes.forEach((heroe) => {
        console.log(`Se mando a la mision a ${heroe.nombre}`);
    });
    // Si ocurre un error, se cortan las demas promesas y se dispara el callback del error:
}).catch(err => {
    alert(err);
    // El finally se ejecuta siempre, sea que la promesa falle o termine con exito:
}).finally(() => {
    console.log('Se completo la promesa de superheroes.')
});

console.log('Hola mundo2');



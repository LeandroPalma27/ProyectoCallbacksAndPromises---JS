import { heroes } from './heroes';
import { buscarHeroe } from './promises';

// La palabra reservada async maneja promesas sin la necesidad de tener que escribir mucho mas codigo:
// Asi quedaria una promesa con el uso de async
export const buscarHeroeAsync = async (id) => {
    const heroe = heroes[id];

    if (heroe) {
        return heroe;
    } else {
        throw `Error, no existe objeto con el id ${id}.`;
        // Podria ser: throw Error(`Error, no existe objeto con el id ${id}.`);
        // Pero no hace falta porque sabemos que tipo de error es.
    }
};

const heroesId = ['iron', 'capi', 'spider'];

export const obtenerArrHeroes = async () => {

    const heoresArr = [];

    for (let id of heroesId) {
        // El await siempre debe ir dentro de una funcion asincrona.
        /* const heroe = buscarHeroeAsync(id); */
        // Cada promesa demora 1 seg en resolverse, y al hacerla en cada iteracion, la resolucion total
        // seria de 3 seg (porque se esperan 3 promesas de 1 seg).
        const heroe = await buscarHeroe(id);
        heoresArr.push(heroe)

        // Y es por eso, que debemos manejar las promesas de otra manera.
    }

    return heoresArr;
}

// PROMESAS RESULTAS TODAS JUNTAS CON EL USO DE AWAIT

export const obtenerArrHeroesOptimizado = async () => {

    const heroesArr = [];

    for (let id of heroesId) {
        // Obtenemos promesas, pero debemos resolverlas todas de golpe al enviarlas.
        heroesArr.push(buscarHeroe(id));
    }

    // Las enviamos todas juntas, pero esperando que se resuelvan con el await:
    return await Promise.all(heroesArr);

}

// Codigo resumido:
const heroesId2 = ['iron', 'capi', 'spider'];
export const obtenerArrHeroesOptimizado2 = async () => await Promise.all(heroesId2.map(buscarHeroe));

export const obtenerHeroesAsync = async (id) => {

    try {
        const heroe = await buscarHeroeAsync(id);
        return heroe;
    } catch (error) {
        // Podria ser asi, si manejamos el uso de catch, pero...
        /* throw error + ' xd'; */
        // Tambien podemos retornar un objeto en especifico:
        return {
            nombre: 'Sin nombre',
            poder: 'Sin poder'
        }
    }

}

const promesasSinTerminar = heroesId2.map(buscarHeroeAsync);
export const promesasResueltas = async() => await Promise.all(heroesId2.map(buscarHeroeAsync));

export const forAwait = async () => {
    for await (const terminado of promesasSinTerminar) {
        setTimeout(() => {
            console.log(terminado)
        }, 5000)
    }
}
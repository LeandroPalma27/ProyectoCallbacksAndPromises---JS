import { heroes } from './heroes';

export const buscarHeroe = (id) => {
    const heroe = heroes[id];

    // Las promesas siempre deben recibir estos dos argumentos: (resolve, reject) o (res, rej)
    return new Promise((resolve, reject) => {
        if (heroe) {
            setTimeout(() => {
                resolve(heroe);
            }, 3000)
        } else {
            reject(`Error, no existe objeto con el id ${id}.`);
        }
    })
};

const promesaLenta = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Promesa lenta');
        }, 3000);
    });
};

const promesaMedia = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Promesa media')
        }, 1500)
    });
};

const promesaRapida = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Promesa rapida')
        }, 1000)
    });
};

export {
    promesaLenta,
    promesaMedia,
    promesaRapida
}
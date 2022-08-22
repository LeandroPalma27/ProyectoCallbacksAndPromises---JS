import { heroes } from './heroes';

// El callback recibe como argumento al asociativo del objeto heroes:
export const buscarHeroe = ( id, callback ) => {
    const heroe = heroes[id];
    if (heroe) callback(null, heroe);
    else callback(`No se encontro un objeto con el id ${id}`);
};
/* eslint-disable prettier/prettier */

/*
En programmation orientée objet, le concept d'interface permet de définir des abstractions sans 
avoir besoin d'écrire de classes. 
Une interface contient une description de ce qui sera implémenté par une classe.
*/
export interface Mess {
    content: string;
    author: string;
    createdAt: Date;
}

import { Breed } from '../../../breeds/entities/breed.entity';
import { Cat } from '../../entities/cat.entity';
import { catStub } from './cat.stub'; // Ajusta la ruta al stub de Cat

export const breedStub = (): Breed => {
  const cat: Cat = catStub(); // Utiliza el stub de Cat para obtener un objeto Cat

  return {
    id: 1, // Puedes definir un ID ficticio para el stub
    name: 'Persa',
    cats: [cat], // Asigna un array con el objeto Cat al campo cats
    deletedAt: null,
  };
};
import { Breed } from '../../../breeds/entities/breed.entity';

export const breedStub = (): Breed => {
  return {
    id: 1, // Puedes definir un ID ficticio para el stub
    name: 'Persa',
    cats: [], // Asigna un array con el objeto Cat al campo cats
    deletedAt: null,
  };
};

import { Dog } from '../models/Dog';

export interface DogRepository {

  list: () => Dog[];

  get: (id: number) => Dog | null;

  add: (dog: Dog) => Dog;

  delete: (id: number) => boolean;

  update: (id: number, dog: Dog) => Dog
}
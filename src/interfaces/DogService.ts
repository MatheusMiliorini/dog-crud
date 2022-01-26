
import { Dog } from '../models/Dog';

export interface DogService {

  list: () => Dog[];

  get: (id: number) => Dog | undefined;

  add: (dog: Dog) => Dog;

  delete: (id: number) => boolean;

  update: (id: number, dog: Dog) => Dog
}
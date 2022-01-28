
import { DogModel } from '../entities/DogModel';
import { DogParam } from '../entities/DogParam';

export interface DogRepository {

  list: () => Promise<DogModel[]>;

  get: (id: string) => Promise<DogModel | null>;

  add: (dog: DogParam) => Promise<DogModel>;

  delete: (id: string) => Promise<boolean>;

  update: (id: string, dog: DogParam) => Promise<DogModel>;
}
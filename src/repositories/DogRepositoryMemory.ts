import { DogRepository } from '../interfaces/DogRepository';
import { DogModel } from '../entities/DogModel';
import { DogParam } from '../entities/DogParam';
import { injectable } from 'inversify';

@injectable()
export class DogRepositoryMemory implements DogRepository {

  dogs: DogModel[];
  lastId: number;

  constructor() {
    this.dogs = [];
    this.lastId = 1;
  }

  list(): Promise<DogModel[]> {
    return Promise.resolve(this.dogs);
  }

  get(id: string): Promise<DogModel | null> {
    return Promise.resolve(this.dogs.find(dog => dog.id == id) || null);
  }

  add(dog: DogParam): Promise<DogModel> {
    const newDog: DogModel = { ...dog, id: (this.lastId++).toString() };
    this.dogs.push(newDog);
    return Promise.resolve(newDog);
  }

  delete(id: string): Promise<boolean> {
    const sizeBefore = this.dogs.length;

    this.dogs = this.dogs.filter(dog => dog.id != id);

    return Promise.resolve(this.dogs.length < sizeBefore);
  }

  update(id: string, dog: DogParam): Promise<DogModel> {
    this.dogs = this.dogs.map(_dog => {
      if (_dog.id == id) {
        _dog = { ...dog, id };
      }
      return _dog;
    });
    const updated = this.dogs.find(_dog => _dog.id == id);
    if (!updated) {
      throw new Error('Dog not found!');
    }
    return Promise.resolve(updated);
  }

}
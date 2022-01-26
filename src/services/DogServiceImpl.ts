import { DogRepository } from '../interfaces/DogRepository';
import { DogService } from '../interfaces/DogService';
import { Dog } from '../models/Dog';


export class DogServiceImpl implements DogService {

  dogRepository: DogRepository;

  constructor(dogRepository: DogRepository) {
    this.dogRepository = dogRepository;
  }

  list(): Dog[] {
    return this.dogRepository.list().sort((a, b) => {
      return a.id < b.id ? -1 : 1;
    });
  }

  get(id: number) : Dog | undefined {
    return this.dogRepository.get(id);
  }

  add (dog: Dog) : Dog {
    return this.dogRepository.add(dog);
  }

  delete (id: number) : boolean {
    return this.dogRepository.delete(id);
  }

  update (id: number, dog: Dog) : Dog {
    dog.id = id;
    return this.dogRepository.update(id, dog);
  }

}
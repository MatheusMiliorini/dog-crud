// import { DogRepository } from '../interfaces/DogRepository';
// import { DogModel } from '../entities/DogModel';

// export class DogRepositoryMemory implements DogRepository {

//   dogs: DogModel[];
//   lastId: number;

//   constructor() {
//     this.dogs = [];
//     this.lastId = 1;
//   }

//   list(): DogModel[] {
//     return this.dogs;
//   }

//   get(id: string): DogModel | null {
//     return this.dogs.find(dog => dog.id == id) || null;
//   }

//   add(dog: DogModel): DogModel {
//     dog.id = (this.lastId++).toString();
//     this.dogs.push(dog);
//     return dog;
//   }

//   delete(id: string): boolean {
//     const sizeBefore = this.dogs.length;

//     this.dogs = this.dogs.filter(dog => dog.id != id);

//     return this.dogs.length < sizeBefore;
//   }

//   update(id: string, dog: DogModel): DogModel {
//     this.dogs = this.dogs.map(_dog => {
//       if (_dog.id == id) {
//         _dog = dog;
//       }
//       return _dog;
//     });
//     const updated = this.dogs.find(_dog => _dog.id == id);
//     if (!updated) {
//       throw new Error('DogModel not found!');
//     }
//     return updated;
//   }

// }
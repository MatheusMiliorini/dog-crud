// import { DogRepository } from '../../src/interfaces/DogRepository';
// import { DogService } from '../../src/interfaces/DogService';
// import { Dog } from '../../src/models/Dog';
// import { DogRepositoryMemory } from '../../src/repositories/DogRepositoryMemory';
// import { DogServiceImpl } from '../../src/services/DogServiceImpl';

// describe('Testing all DogService methods', () => {

//   const dogRepository: DogRepository = new DogRepositoryMemory;
//   const dogService: DogService = new DogServiceImpl(dogRepository);

//   const testDog: Dog = {
//     name: 'Teo',
//     age: 2,
//     id: 0
//   };

//   test('Should return empty list', () => {
//     expect(dogService.list().length).toBe(0);
//   });

//   test('Add two dogs and check list size', () => {
//     dogService.add(Object.assign({}, testDog));
//     const newDog = dogService.add(Object.assign({}, testDog));

//     expect(newDog.id).toBe(2);
//     expect(dogService.list().length).toBe(2);

//     const dogAtPosition = dogService.get(2);
//     expect(dogAtPosition).not.toBeUndefined();
//     expect(dogAtPosition).toStrictEqual(newDog);
//   });

//   test('Check list is ordered', () => {
//     const dogs = dogService.list();
//     expect(dogs[0].id).toBeLessThan(dogs[1].id);
//   });

//   test('Delete dog', () => {
//     expect(dogService.list().length).toBeGreaterThan(0);
//     expect(dogService.delete(1)).toBe(true);
//     expect(dogService.list().length).toBe(1);
//   });

//   test('New dog after delete should be 3', () => {
//     const newDog = dogService.add(Object.assign({}, testDog));
//     expect(newDog.id).toBe(3);
//   });

//   test('Update dog', () => {
//     const toUpdate = {
//       id: 99, name: 'Jeremias', age: 14
//     };
//     const updatedDog = dogService.update(2, Object.assign({}, toUpdate));
//     expect(updatedDog.id).not.toEqual(toUpdate.id);
//     expect(updatedDog.id).toEqual(2);
//     expect(updatedDog.name).toBe(toUpdate.name);
//     expect(updatedDog.age).toBe(toUpdate.age);
//   });

//   test('Update dog that doesn\'t exist', () => {
//     expect(() => dogService.update(0, Object.assign({}, testDog))).toThrow();
//   });

// });
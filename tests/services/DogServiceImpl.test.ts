import { DogParam } from '../../src/entities/DogParam';
import { DogRepository } from '../../src/interfaces/DogRepository';
import { DogService } from '../../src/interfaces/DogService';
import { DogRepositoryMemory } from '../../src/repositories/DogRepositoryMemory';
import { DogServiceImpl } from '../../src/services/DogServiceImpl';

describe('Testing all DogService methods', () => {

  const dogRepository: DogRepository = new DogRepositoryMemory();
  const dogService: DogService = new DogServiceImpl(dogRepository);

  const testDog: DogParam = {
    name: 'Luna',
    age: 5,
  };

  test('Should return empty list', async () => {
    expect((await dogService.list()).length).toBe(0);
  });

  test('Add two dogs and check list size', async () => {
    dogService.add(Object.assign({}, testDog));
    const newDog = await dogService.add(Object.assign({}, { ...testDog, name: 'Amendoim' }));

    expect(newDog.id).toBeTruthy();
    expect((await dogService.list()).length).toBe(2);
  });

  test('Check list is ordered', async () => {
    const dogs = await dogService.list();
    expect(dogs[0].name <= dogs[1].name).toBe(true);
  });

  test('Delete dog', async () => {
    const dogsList = await dogService.list();
    const currentSize = dogsList.length;
    expect(dogsList.length).toBeGreaterThan(0);
    expect(await dogService.delete(dogsList[0].id)).toBe(true);
    expect((await dogService.list()).length).toBe(currentSize - 1);
  });

  test('Update dog', async () => {
    const toUpdate: DogParam = {
      name: 'Jeremias', age: 14
    };
    const dogsList = await dogService.list();
    const updatedDog = await dogService.update(dogsList[0].id, Object.assign({}, toUpdate));
    expect(updatedDog.id).toEqual(dogsList[0].id);
    expect(updatedDog.name).toBe(toUpdate.name);
    expect(updatedDog.age).toBe(toUpdate.age);
  });

  test('Update dog that doesn\'t exist', () => {
    expect(() => dogService.update('123', Object.assign({}, testDog))).toThrow();
  });

});
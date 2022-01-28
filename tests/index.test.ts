import request from 'supertest';
import { DogModel } from '../src/entities/DogModel';
import { DogParam } from '../src/entities/DogParam';
import app from '../src/index';

describe('Test endpoints', () => {

  let validId: string;

  test('Should add new dog status 200', () => {
    const dog: DogParam = {
      age: 15,
      name: 'Scooby',
    };

    return request(app)
      .post('/dogs')
      .send(dog)
      .then(res => {
        const resDog: DogModel = res.body;
        expect(resDog.id).toBeTruthy();
        validId = resDog.id;
      });
  });

  test('Get dog', () => {
    return request(app)
      .get(`/dogs/${validId}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        const dog: DogModel = res.body;
        expect(dog.id).toBe(validId);
      });
  });

  test('Should return list of dogs', () => {
    return request(app)
      .get('/dogs')
      .then(res => {
        expect(res.statusCode).toBe(200);
        const dogsList: DogModel[] = res.body;
        expect(dogsList.length).toBeGreaterThan(0);
        expect(dogsList[0].id).toBeTruthy();
      });
  });

  test('Should update dog', () => {
    const dog: DogParam = {
      name: 'Bariloche',
      age: 10
    };

    return request(app)
      .put(`/dogs/${validId}`)
      .send(dog)
      .then(res => {
        expect(res.statusCode).toBe(200);
        const updated: DogModel = res.body;
        expect(updated.id).toBeTruthy();
        expect(updated.name).toBe(dog.name);
      });
  });

  test('Should delete dog', () => {
    return request(app)
      .delete(`/dogs/${validId}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({ deleted: true });
      });
  });
});


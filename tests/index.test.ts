import request from 'supertest';
import app from '../index';
import { Dog } from '../src/models/Dog';

describe('Test endpoints', () => {

  test('Should new dog status 200', () => {
    const dog: Dog = {
      age: 15,
      name: 'Scooby',
      id: 0
    };
    return request(app)
      .post('/dogs')
      .send(dog)
      .then(res => {
        const resDog: Dog = res.body;
        expect(resDog.id).toBe(1);
      });
  });

  test('Should return list of dogs', () => {
    return request(app)
      .get('/dogs')
      .then(res => {
        expect(res.statusCode).toBe(200);
        const dogsList: Dog[] = res.body;
        expect(dogsList.length).toBeGreaterThan(0);
        expect(dogsList[0].id).toBeGreaterThan(0);
      });
  });

  test('Should update dog', () => {
    const dog: Dog = {
      id: 0,
      name: 'Bariloche',
      age: 10
    };
    return request(app)
      .put('/dogs/1')
      .send(dog)
      .then(res => {
        expect(res.statusCode).toBe(200);
        const updated: Dog = res.body;
        expect(Number(updated.id)).toBe(1);
        expect(updated.name).toBe(dog.name);
      });
  });

  test('Get dog', () => {
    return request(app)
      .get('/dogs/1')
      .then(res => {
        expect(res.statusCode).toBe(200);
        const dog: Dog = res.body;
        expect(Number(dog.id)).toBe(1);
      });
  });

  test('Should delete dog', () => {
    return request(app)
      .delete('/dogs/1')
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({ deleted: true });
      });
  });
});


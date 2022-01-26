/* eslint-disable @typescript-eslint/ban-types */
import { Router } from 'express';
import { DogRepository } from '../interfaces/DogRepository';
import { DogService } from '../interfaces/DogService';
import { Dog } from '../models/Dog';
import { DogRepositoryMemory } from '../repositories/DogRepositoryMemory';
import { DogServiceImpl } from '../services/DogServiceImpl';
import { Request } from 'express';

const router = Router();

const dogRepository :DogRepository = new DogRepositoryMemory;
const dogService: DogService = new DogServiceImpl(dogRepository);

router.get('/', function(req, res) {
  res.json(dogService.list());
});

router.get('/:id', (req: Request<{ id: number }>, res) => {
  res.json(dogService.get(req.params.id));
});

router.post('/', (req: Request<{}, {}, Dog>, res) => {
  const dog: Dog = dogService.add(req.body);
  res.json(dog);
});

router.put('/:id', (req: Request<{id: number}, {}, Dog>, res) => {
  const dog: Dog = dogService.update(req.params.id, req.body);
  res.json(dog);
});

router.delete('/:id', (req: Request<{id: number}>, res) => {
  const deleted: boolean = dogService.delete(req.params.id);
  res.json({ deleted });
});

export default router;

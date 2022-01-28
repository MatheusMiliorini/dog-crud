/* eslint-disable @typescript-eslint/ban-types */
import { Router } from 'express';
import { DogRepository } from '../interfaces/DogRepository';
import { DogService } from '../interfaces/DogService';
import { DogModel } from '../entities/DogModel';
import { DogServiceImpl } from '../services/DogServiceImpl';
import { Request } from 'express';
import DogRepositoryFirestore from '../repositories/DogRepositoryFirestore';
import { DogParam } from '../entities/DogParam';

const router = Router();

const dogRepository: DogRepository = new DogRepositoryFirestore();
const dogService: DogService = new DogServiceImpl(dogRepository);

router.get('/', async (req, res) => {
  res.json(await dogService.list());
});

router.get('/:id', async (req: Request<{ id: string }>, res) => {
  res.json(await dogService.get(req.params.id));
});

router.post('/', async (req: Request<{}, {}, DogParam>, res) => {
  const dog: DogModel = await dogService.add(req.body);
  res.json(dog);
});

router.put('/:id', async (req: Request<{ id: string }, {}, DogParam>, res) => {
  const dog: DogModel = await dogService.update(req.params.id, req.body);
  res.json(dog);
});

router.delete('/:id', async (req: Request<{ id: string }>, res) => {
  const deleted: boolean = await dogService.delete(req.params.id);
  res.json({ deleted });
});

export default router;

/* eslint-disable @typescript-eslint/ban-types */
import { Router } from 'express';
import { DogService } from '../interfaces/DogService';
import { DogModel } from '../entities/DogModel';
import { Request } from 'express';
import { DogParam } from '../entities/DogParam';
import { container } from '../inversify.config';
import { TYPES } from '../types';

const router = Router();

const dogService = container.get<DogService>(TYPES.DogService);

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

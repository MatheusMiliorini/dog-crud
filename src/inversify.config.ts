import 'reflect-metadata';
import { Container } from 'inversify';
import { DogRepository } from './interfaces/DogRepository';
import { DogService } from './interfaces/DogService';
import DogRepositoryFirestore from './repositories/DogRepositoryFirestore';
import { DogServiceImpl } from './services/DogServiceImpl';
import { TYPES } from './types';

const container = new Container();
container.bind<DogRepository>(TYPES.DogRepository).to(DogRepositoryFirestore);
container.bind<DogService>(TYPES.DogService).to(DogServiceImpl);

export { container };
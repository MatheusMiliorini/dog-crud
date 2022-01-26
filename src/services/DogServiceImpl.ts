import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { DogRepository } from '../interfaces/DogRepository';
import { DogService } from '../interfaces/DogService';
import { Dog } from '../models/Dog';


@Route('/dogs')
export class DogServiceImpl implements DogService {

  dogRepository: DogRepository;

  constructor(dogRepository: DogRepository) {
    this.dogRepository = dogRepository;
  }

  @Get('/')
  list(): Dog[] {
    return this.dogRepository.list().sort((a, b) => {
      return a.id < b.id ? -1 : 1;
    });
  }

  @Get('/{id}')
  get(@Path() id: number): Dog | null {
    return this.dogRepository.get(id);
  }

  @Post('/')
  add(@Body() dog: Dog): Dog {
    return this.dogRepository.add(dog);
  }

  @Delete('/{id}')
  delete(@Path() id: number): boolean {
    return this.dogRepository.delete(id);
  }

  @Put('/{id}')
  update(@Path() id: number, @Body() dog: Dog): Dog {
    dog.id = id;
    return this.dogRepository.update(id, dog);
  }

}
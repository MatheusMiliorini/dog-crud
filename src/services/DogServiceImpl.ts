import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { DogRepository } from '../interfaces/DogRepository';
import { DogService } from '../interfaces/DogService';
import { DogModel } from '../entities/DogModel';
import { DogParam } from '../entities/DogParam';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';


@injectable()
@Route('/dogs')
export class DogServiceImpl implements DogService {

  dogRepository: DogRepository;

  constructor(@inject(TYPES.DogRepository) dogRepository: DogRepository) {
    this.dogRepository = dogRepository;
  }

  @Get('/')
  async list(): Promise<DogModel[]> {
    return (await this.dogRepository.list()).sort((a, b) => {
      return a.name < b.name ? -1 : (a.name == b.name ? 0 : 1);
    });
  }

  @Get('/{id}')
  async get(@Path() id: string): Promise<DogModel | null> {
    return await this.dogRepository.get(id);
  }

  @Post('/')
  add(@Body() dog: DogParam): Promise<DogModel> {
    return this.dogRepository.add(dog);
  }

  @Delete('/{id}')
  delete(@Path() id: string): Promise<boolean> {
    return this.dogRepository.delete(id);
  }

  @Put('/{id}')
  update(@Path() id: string, @Body() dog: DogParam): Promise<DogModel> {
    return this.dogRepository.update(id, dog);
  }

}
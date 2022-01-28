import { DogRepository } from '../interfaces/DogRepository';
import { DogModel } from '../entities/DogModel';
import { db } from '../firebase';
import { DogParam } from '../entities/DogParam';

export default class DogRepositoryFirestore implements DogRepository {

  private COLLECTION_NAME = 'dogs';

  async list(): Promise<DogModel[]> {
    const dogs: DogModel[] = [];
    (await db.collection(this.COLLECTION_NAME).get()).forEach(doc => {
      dogs.push({ ...doc.data(), id: doc.id } as DogModel);
    });
    return dogs;
  }

  async get(id: string): Promise<DogModel | null> {
    const doc = await db.collection(this.COLLECTION_NAME).doc(id).get();
    if (doc.exists) {
      return doc.data() as DogModel;
    }
    return null;
  }

  async add(dog: DogParam): Promise<DogModel> {
    const doc = await db.collection(this.COLLECTION_NAME).add(dog);
    return { ...(await doc.get()).data(), id: doc.id } as DogModel;
  }

  async delete(id: string): Promise<boolean> {
    const doc = await db.collection(this.COLLECTION_NAME).doc(id).get();
    if (doc.exists) {
      await doc.ref.delete();
      return true;
    }
    return false;
  }

  async update(id: string, dog: DogParam): Promise<DogModel> {
    const doc = await db.collection(this.COLLECTION_NAME).doc(id).get();
    await doc.ref.update(dog);
    return { ...(await doc.ref.get()).data(), id: id } as DogModel;
  }

}
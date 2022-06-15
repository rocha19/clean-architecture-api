import { UserData } from '@/domain';
import { UserRepository } from '@/use-cases/register-user-on-mailing/ports';
import { MongoHelper } from './helper';

export class MongodbUserRespository implements UserRepository {
  async add(user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection('user');
    const exists = await this.exists(user);
    if (!exists) await userCollection.insertOne(user);
  }
  async findUserByEmail(email: string): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('user');
    const result = await userCollection.findOne({ email: email });
    return result;
  }
  async findAllUsers(): Promise<UserData[]> {
    throw new Error('Method not implemented.');
  }
  async exists(user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email);
    if (result != null) return true;
    return false;
  }
}

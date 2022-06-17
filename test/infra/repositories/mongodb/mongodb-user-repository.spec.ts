import 'dotenv/config';
import { MongodbUserRepository } from '@/infra/repositories/mongodb';
import { MongoHelper } from '@/infra/repositories/mongodb/helper';

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(`${process.env.MONGO_URL}`);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  beforeEach(async () => {
    await MongoHelper.clearCollection('users');
  });
  it('when user is added, it shold exist', async () => {
    const userRepository = new MongodbUserRepository();
    const user = {
      name: 'any_name',
      email: 'any@email.com',
    };
    await userRepository.add(user);
    expect(await userRepository.exists(user)).toBeTruthy();
  });
  it('find all users should return all added users', async () => {
    const userRepository = new MongodbUserRepository();
    await userRepository.add({
      name: 'any_name',
      email: 'any@mail.com',
    });
    await userRepository.add({
      name: 'second_name',
      email: 'second@mail.com',
    });
    const users = await userRepository.findAllUsers();
    expect(users[0].name).toEqual('any_name');
    expect(users[1].name).toEqual('second_name');
  });
});

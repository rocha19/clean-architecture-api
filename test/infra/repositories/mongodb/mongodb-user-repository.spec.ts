import { MongodbUserRespository } from '@/infra/repositories/mongodb';
import { MongoHelper } from '@/infra/repositories/mongodb/helper';

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  beforeEach(() => {
    MongoHelper.clearCollection('users');
  });
  it('when user is added, it shold exist', async () => {
    const userRepository = new MongodbUserRespository();
    const user = {
      name: 'nay_name',
      email: 'any@email.com',
    };
    await userRepository.add(user);
    expect(await userRepository.exists(user)).toBeTruthy();
  });
});

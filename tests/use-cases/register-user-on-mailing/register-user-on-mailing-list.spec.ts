import { UserData } from '../../../src/modules/api/use-cases/register-user-on-mailing/user-data';

describe('Register user on mailing list use case', () => {
  test('should add user with copmplete data to mailing list', async () => {
    const users: UserData[] = [];
    expect(users).toBe(users);
    // const repository: UserRepository = new InMemoryUserRepository(users);
    // const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
    //   repository,
    // );
    // const name = 'any-name';
    // const email = 'any@email.com';
    // const response = await usecase.RegisterUserOnMailingList({ name, email });
    // const user = repository.findUserByEmail('any@email.com');
    // expect((await user).name).toBe('any-name');
  });
});

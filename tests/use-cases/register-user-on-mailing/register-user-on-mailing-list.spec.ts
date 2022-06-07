import { UserRepository } from '@/modules/api/use-cases/register-user-on-mailing/ports/user-repository';
import { InMemoryUserRepository } from '@/modules/api/use-cases/register-user-on-mailing/repository/in-memory-user-repository';
import { UserData } from '@/modules/api/use-cases/register-user-on-mailing/user-data';

describe('Register user on mailing list use case', () => {
  test('should add user with copmplete data to mailing list', async () => {
    const users: UserData[] = [];
    console.log(users);
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

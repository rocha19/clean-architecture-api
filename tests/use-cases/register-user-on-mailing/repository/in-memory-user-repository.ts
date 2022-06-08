import { UserData } from '../../../../src/entities/user-data';
import { InMemoryUserRepository } from '../../../../src/use-cases/register-user-on-mailing/repository/in-memory-user-repository';

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);
    const user = await userRepository.findUserByEmail('any@email.com');
    expect(user).toBe('Method not implemented.');
  });

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = [];
    const name = 'any-name';
    const email = 'any@email.com';
    const userRepository = new InMemoryUserRepository(users);
    userRepository.add({ name, email });
    const user = await userRepository.findUserByEmail('any@email.com');
    expect(user.name).toBe('any-name');
  });
});

import { UserRepository } from '../../../src/use-cases/register-user-on-mailing/ports/user-repository';
import { InMemoryUserRepository } from '../../../src/use-cases/register-user-on-mailing/repository/in-memory-user-repository';
import { UserData } from '../../../src/entities/user-data';
import { RegisterUserOnMailingList } from '../../../src/use-cases/register-user-on-mailing/register-user-on-mailing-list';
import { left } from '../../../src/shared/either';
import { InvalidEmailError } from '../../../src/entities/errors/invalide-email-error';

describe('Register user on mailing list use case', () => {
  test('should add user with copmplete data to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const name = 'any-name';
    const email = 'any@email.com';
    const response = await useCase.registerUserOnMailingList({
      name,
      email,
    });
    const user = await repository.findUserByEmail('any@email.com');
    expect(user?.name).toBe('any-name');
    expect(response.value.name).toBe('any-name');
  });
  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const name = 'any-name';
    const invalidEmail = 'invalid_email';
    const response = await useCase.registerUserOnMailingList({
      name,
      email: invalidEmail,
    });
    const user = await repository.findUserByEmail('any@email.com');
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidEmailError()));
  });
});

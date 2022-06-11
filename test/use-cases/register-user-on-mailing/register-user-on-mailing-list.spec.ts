import { UserRepository } from '@/use-cases/register-user-on-mailing/ports';
import { UserData } from '@/entities';
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';
import { InMemoryUserRepository } from '@/use-cases/register-user-on-mailing/repository';

describe('Register user on mailing list use case', () => {
  it('should add user with copmplete data to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const name = 'any-name';
    const email = 'any@email.com';
    const response = await useCase.perform({
      name,
      email,
    });
    const user = await repository.findUserByEmail('any@email.com');
    expect(user?.name).toBe('any-name');
    expect(response.value.name).toBe('any-name');
  });
  it('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const name = 'any-name';
    const invalidEmail = 'invalid_email';
    const response = (
      await useCase.perform({
        name,
        email: invalidEmail,
      })
    ).value as Error;
    const user = await repository.findUserByEmail('any@email.com');
    expect(user).toBeNull();
    expect(response.name).toEqual('InvalidEmailError');
  });
  it('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const name = '';
    const invalidEmail = 'any@email.com';
    const response = (
      await useCase.perform({
        name,
        email: invalidEmail,
      })
    ).value as Error;
    const user = await repository.findUserByEmail('any@email.com');
    expect(user).toBeNull();
    expect(response.name).toEqual('InvalidNameError');
  });
});

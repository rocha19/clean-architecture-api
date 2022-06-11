import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';
import { RegisterUserController } from '@/web-controllers';
import { InMemoryUserRepository } from '@/use-cases/register-user-on-mailing/repository';

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([]);
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(
    inMemoryUserRepository,
  );
  const registerUserController = new RegisterUserController(
    registerUserOnMailingListUseCase,
  );
  return registerUserController;
};

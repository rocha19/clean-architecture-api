import { UserData } from '@/entities';
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';
import { UserRepository } from '@/use-cases/register-user-on-mailing/ports';
import { HttpRequest, HttpResponse } from '@/web-controllers/ports';
import { RegisterUserController } from '@/web-controllers/register-user-controller';
import { InMemoryUserRepository } from '@test/use-cases/register-user-on-mailing/repository';

describe('Sign up web controller', () => {
  it('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any name',
        email: 'any@email.com',
      },
    };
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const controller: RegisterUserController = new RegisterUserController(
      usecase,
    );
    const response: HttpResponse = await controller.handle(request);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(request.body);
  });
});

import { UserData } from '@/entities';
import { InvalidEmailError, InvalidNameError } from '@/entities/errors';
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';
import { UserRepository } from '@/use-cases/register-user-on-mailing/ports';
import { MissingParamError } from '@/web-controllers/errors/missing-param-error';
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
  it('should return status code 400 when request contains invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidNameError);
  });
  it('should return status code 400 when request contains invalid e-mail', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email.com',
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidEmailError);
  });
  it('should return status code 400 when request is missing user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: name',
    );
  });
  it('should return status code 400 when request is missing user e-mail', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'any_name',
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: e-mail',
    );
  });
  it('should return status code 400 when request is missing user name and e-mail', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {},
    };
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const controller: RegisterUserController = new RegisterUserController(
      usecase,
    );
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: name and e-mail',
    );
});

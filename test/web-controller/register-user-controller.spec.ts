import { UserData } from '@/entities';
import { InvalidEmailError, InvalidNameError } from '@/entities/errors';
import { UseCase } from '@/use-cases/ports';
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';
import { UserRepository } from '@/use-cases/register-user-on-mailing/ports';
import { MissingParamError } from '@/web-controllers/errors/missing-param-error';
import { HttpRequest, HttpResponse } from '@/web-controllers/ports';
import { RegisterUserController } from '@/web-controllers/register-user-controller';
import { InMemoryUserRepository } from '@test/use-cases/register-user-on-mailing/repository';

describe('Sign up web controller', () => {
  class ErrorThrowingUseCaseStub implements UseCase {
    perform(request: any): Promise<void> {
      throw Error();
    }
  }
  const users: UserData[] = [];
  const repository: UserRepository = new InMemoryUserRepository(users);
  const usecase: UseCase = new RegisterUserOnMailingList(repository);
  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub();
  const controller: RegisterUserController = new RegisterUserController(
    usecase,
  );
  it('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any name',
        email: 'any@email.com',
      },
    };
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: email',
    );
  });
  it('should return status code 400 when request is missing user name and e-mail', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {},
    };
    const response: HttpResponse = await controller.handle(
      requestWithInvalidName,
    );
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual(
      'Missing parameter from request: name email',
    );
  });
  it('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any name',
        email: 'any@email.com',
      },
    };
    const controller: RegisterUserController = new RegisterUserController(
      errorThrowingUseCaseStub,
    );
    const response: HttpResponse = await controller.handle(request);
    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Error);
  });
});

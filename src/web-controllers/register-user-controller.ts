import { UserData } from '@/entities';
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';
import { HttpRequest } from '@/web-controllers/ports';
import { badRequest, created } from '@/web-controllers/util';
import { MissingParamError } from './errors/missing-param-error';

export class RegisterUserController {
  constructor(private readonly usecase: RegisterUserOnMailingList) {}
  public async handle(request: HttpRequest) {
    if (!request.body.name || !request.body.email) {
      let missingParam = !request.body.name ? 'name ' : '';
      missingParam += !request.body.email ? 'email' : '';
      return badRequest(new MissingParamError(missingParam.trim()));
    }
    const userData: UserData = request.body;
    const response = await this.usecase.registerUserOnMailingList(userData);
    if (response.isLeft()) return badRequest(response.value);
    if (response.isRight()) return created(response.value);
  }
}

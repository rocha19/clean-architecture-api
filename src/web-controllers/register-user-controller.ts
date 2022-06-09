import { UserData } from '@/entities';
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';
import { HttpRequest } from '@/web-controllers/ports';
import { created } from '@/web-controllers/util';

export class RegisterUserController {
  constructor(private readonly usecase: RegisterUserOnMailingList) {}
  public async handle(request: HttpRequest) {
    const userData: UserData = request.body;
    const response = await this.usecase.registerUserOnMailingList(userData);
    if (response.isRight()) {
      return created(response.value);
    }
  }
}

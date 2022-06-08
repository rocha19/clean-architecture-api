import { InvalidNameError } from '../../entities/errors/invalid-name-error';
import { InvalidEmailError } from '../../entities/errors/invalide-email-error';
import { User } from '../../entities/user';
import { UserData } from '../../entities/user-data';
import { Either, left, right } from '../../shared/either';
import { UserRepository } from './ports/user-repository';

export class RegisterUserOnMailingList {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async registerUserOnMailingList(
    request: UserData,
  ): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(request);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }
    if (!(await this.userRepository.exists(request))) {
      await this.userRepository.add(request);
    }
    return right(request);
  }
}

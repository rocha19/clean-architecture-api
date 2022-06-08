import { Either, left, right } from '../shared/either';
import { Email } from './email';
import { InvalidNameError } from './errors/invalid-name-error';
import { InvalidEmailError } from './errors/invalide-email-error';
import { Name } from './name';
import { UserData } from './user-data';

export class User {
  public readonly email: Email;
  public readonly name: Name;
  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
  }
  public static create(
    userData: UserData,
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(userData.name));
    }
    const emailOrError = Email.create(userData.email);
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(userData.email));
    }
    const name: Name = nameOrError.value as Name;
    const email: Email = emailOrError.value as Email;
    return right(new User(name, email));
  }
}

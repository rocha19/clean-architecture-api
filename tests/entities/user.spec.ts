import { left, Left } from '../../src/shared/either';
import { User } from '../../src/entities/user';
import { InvalidEmailError } from '../../src/entities/errors/invalide-email-error';
import { InvalidNameError } from '../../src/entities/errors/invalid-name-error';

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email';
    const error = User.create({ name: 'any_name', email: invalidEmail });
    expect(error).toEqual(new Left(new InvalidEmailError()));
  });
  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0       ';
    const error = User.create({ name: invalidName, email: 'any@email.com' });
    expect(error.isLeft).toEqual(left(new InvalidNameError()).isLeft);
  });
  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = '0'.repeat(257);
    const error = User.create({ name: invalidName, email: 'any@email.com' });
    expect(error.isLeft).toEqual(left(new InvalidNameError()).isLeft);
  });
  test('should not create user with data', () => {
    const validName = 'any_name';
    const valideEmail = 'any@mail.com';
    const user: User = User.create({ name: validName, email: valideEmail })
      .value as User;
    expect(user.name.value).toEqual(validName);
    expect(user.email.value).toEqual(valideEmail);
  });
});

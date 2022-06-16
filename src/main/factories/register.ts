import { MongodbUserRepository } from '@/infra/repositories/mongodb';
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing';

export const makeRegisterAndSendEmailController =
  (): RegisterAndSendEmailController => {
    const mongoDbUserRepository = new MongodbUserRepository();
    const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(
      mongoDbUserRepository,
    );
    const emailService = new NodemailerEmailService();
    const sendEmailUseCase = new SendEmail(getEmailOptions(), emailService);
    const registerAndSendEmailUseCase = new RegisterAndSendEmail(
      registerUserOnMailingListUseCase,
      sendEmailUseCase,
    );
    const registerUserController = new RegisterAndSendEmailController(
      registerAndSendEmailUseCase,
    );
    return registerUserController;
  };

import { RegisterUserController } from '@/web-controllers';
import { HttpRequest, HttpResponse } from '@/web-controllers/ports';
import { Request, Response } from 'express';

export const adaptRoute = (controller: RegisterUserController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
    };
    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

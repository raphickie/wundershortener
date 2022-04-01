import { AnyObjectSchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validateResource =
  (resourceSchema: AnyObjectSchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await resourceSchema.validate({
        body: request.body,
        query: request.query,
        params: request.params,
      });
      next();
    } catch (e) {
      return response.status(400).send(e);
    }
  };

export default validateResource;

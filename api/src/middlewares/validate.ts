import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { STATUS_CODE } from '../enums/status.enum';

export const validateZod = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        if (!errors[issue.path[0] as string]) {
          errors[issue.path[0] as string] = [];
        }
        errors[issue.path[0] as string].push(issue.message);
      });

      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.UNPROCESSABLE_ENTITY,
        message: 'Validation failed',
        errors,
      });
    }
    req.body = result.data;
    next();
  };
};

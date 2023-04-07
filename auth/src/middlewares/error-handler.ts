import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		console.log('Handling this error as a request validation error');

		return res.status(err.statusCode).send({ errors: err.serializeError() });
	}

	res.status(400).send({
		errors: [{ message: 'Something went wrong' }],
	});
};

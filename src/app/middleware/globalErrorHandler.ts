import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../interfaces/errors'
import config from '../../config'
import handleValidationError from '../errors/validationErrors'
import ApiError from '../errors/apiErrors'
import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.log('globalErrorHandler', err)
    : errorLogger.error('globalErrorHandler', err)

  let statusCode = 500
  let message = 'Something went wrong '
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessages
    return simplifiedError
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler

import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import router from './app/routes'
import httpStatus from 'http-status'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', router)
// app.get('/',  async (req: Request, res: Response,next:NextFunction) => {
//   Promise.reject(new Error('Unhandled promise rejection') )
// })
app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'NOt found ',
    errorMessage: [
      {
        path: '',
        message: 'Api Not found',
      },
    ],
  })
  next()
})
export default app

import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

async function main() {
  let server: Server
  try {
    await mongoose.connect(config.dataBase_url as string)

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(error)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection for closing server')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
      })
    }
    process.exit(1)
  })
}

main()

import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

async function main() {
  try {
    await mongoose.connect(config.dataBase_url as string)

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

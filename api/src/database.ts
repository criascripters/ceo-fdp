import mongoose from 'mongoose'
import { settings } from './utils/settings'

async function connect() {
  try {
    await mongoose.connect(settings.databaseUrl)
    console.info('[INFO] Connected to mongoDB:', settings.databaseUrl)
  } catch (error) {
    console.error('[ERROR] Error connecting to mongoDB:', error)
  }
}

connect()

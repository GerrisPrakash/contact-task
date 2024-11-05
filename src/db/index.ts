import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'
import migrations from './migrations'
import Contacts from '../models/Contacts'
import Tasks from '../models/Tasks'

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: Platform.OS === 'ios',
  onSetUpError: error => {
    console.log(error)
  }
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    Contacts,
    Tasks
  ],
})

export default database

export const contactsCollection = database.get<Contacts>('contacts');
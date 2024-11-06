import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'contacts',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'number', type: 'string'},
      ]
    }),
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'number', type: 'string'},
        { name: 'todo', type: 'string' },
        { name: 'status', type: 'string'},
      ]
    }),
  ]
})
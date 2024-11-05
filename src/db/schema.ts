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
    // tableSchema({
    //   name: 'task',
    //   columns: [
    //     { name: 'body', type: 'string' },
    //     { name: 'post_id', type: 'string', isIndexed: true },
    //   ]
    // }),
  ]
})
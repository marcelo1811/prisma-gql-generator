module.exports = {
  basicTypes: [
    'Int',
    'String',
    'Float',
    'Boolean',
    'Date',
    'ID',
  ],
  transformValues: {
    DateTime: 'Date',
  },
  fileToRead: 'prisma.schema',
  outputFileName: 'result.gql',
}
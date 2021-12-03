module.exports = {
  basicTypes: [
    'Int',
    'String',
    'Float',
    'Boolean',
    'Date',
    'ID',
    'DateTime'
  ],
  transformValues: {
    DateTime: 'Date',
  },
  mockedValues: {
    'Int': 1,
    'String': '"teste"',
    'Float': 1,
    'Boolean': false,
    'Date': `"${new Date().toISOString()}"`,
    'ID': 1,
    'DateTime': `"${new Date().toISOString()}"`,    
  },
  prismaSchemaFile: 'prisma.schema',
  outputGqlFileName: 'typDefs.gql',
  outputMqttFileName: 'mqtt.js',
  outputMockedData: 'mockedData.js',
  exportPrefix: 'exports.',
}
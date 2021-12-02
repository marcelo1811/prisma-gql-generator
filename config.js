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
  outputGqlFileName: 'typDefs.gql',
  outputMqttFileName: 'mqtt.js',
}
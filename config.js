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
  outputMqttFileName: 'variables.js',
  outputMockedData: 'mockedData.js',
  exportPrefix: 'exports.',
  outputGqlPaths: [
    // '/Users/marcelomiyachi/code/gti-it/furukawa3/edge-infra/edge-backend/src/graphql',
    // '/Users/marcelomiyachi/code/gti-it/furukawa3/cloud-infra/cloud-backend/src/graphql',
  ],
  outputMqttPaths: [
    // '/Users/marcelomiyachi/code/gti-it/furukawa3/edge-infra/mqtt_edge/src/utils',
    // '/Users/marcelomiyachi/code/gti-it/furukawa3/cloud-infra/mqtt_cloud/src/utils',
  ],
}
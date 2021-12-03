const fs = require('fs');
const { prismaSchemaFile, outputGqlFileName, outputMqttFileName, outputMockedData } = require('./config');
const generateMockedData = require('./services/generateMockedData');
const generateOutputGQL = require('./services/generateOutputGQL');
const generateOutputMQTT = require('./services/generateOutputMQTT');

const { 
  removeSpaceFromBeginOfLines,
  removePrismaArgsFromLines,
  transformModelNamesToUpperCamelCase,
  getAllModelsFromSchema,
 } = require('./utils');

console.log('Starting...')

const initialSchema = fs.readFileSync(`${__dirname}/${prismaSchemaFile}`, 'utf-8');

schema = removeSpaceFromBeginOfLines(initialSchema);
schema = removePrismaArgsFromLines(schema);
schema = transformModelNamesToUpperCamelCase(schema);

const models = getAllModelsFromSchema(schema);

const gqlOutput = models.map((model) => generateOutputGQL(model))
                        .join('\n\n');
const mqttOutput = models.map((model) => generateOutputMQTT(model))
                        .join('\n\n');
const mockedData = models.map((model) => generateMockedData(model))
                        .join('\n\n');



fs.writeFileSync(`outputs/${outputGqlFileName}`, gqlOutput);
fs.writeFileSync(`outputs/${outputMqttFileName}`, mqttOutput);
fs.writeFileSync(`outputs/${outputMockedData}`, mockedData);
console.log('Done!');







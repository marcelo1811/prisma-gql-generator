const fs = require('fs');
const { fileToRead, outputGqlFileName, outputMqttFileName } = require('./config');
const generateOutputGQL = require('./services/generateOutputGQL');
const generateOutputMQTT = require('./services/generateOutputMQTT');

const { 
  removeSpaceFromBeginOfLines,
  removePrismaArgsFromLines,
  transformModelNamesToUpperCamelCase,
  getAllModelsFromSchema,
 } = require('./utils');

console.log('Starting...')

const initialSchema = fs.readFileSync(`${__dirname}/${fileToRead}`, 'utf-8');

schema = removeSpaceFromBeginOfLines(initialSchema);
schema = removePrismaArgsFromLines(schema);
schema = transformModelNamesToUpperCamelCase(schema);

const models = getAllModelsFromSchema(schema);

const gqlOutput = models.map((model) => generateOutputGQL(model))
                        .join('\n\n');
const mqttOutput = models.map((model) => generateOutputMQTT(model))
                        .join('\n\n');

fs.writeFileSync(`outputs/${outputGqlFileName}`, gqlOutput);
fs.writeFileSync(`outputs/${outputMqttFileName}`, mqttOutput);
console.log('Done!');







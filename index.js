const fs = require('fs');
const { fileToRead, outputGqlFileName, outputMqttFileName } = require('./config');
const generateModelGQLs = require('./services/generateModelGQLs');
const generateMQTTFields = require('./services/generateMQTTFields');
const generateMQTTInputData = require('./services/generateMQTTInputData');
const generateMQTTInputVariables = require('./services/generateMQTTInputVariables');

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

const gqlOutput = models.map((model) => generateModelGQLs(model))
                        .join('\n\n');

const mqttInputData = models.map((model) => generateMQTTInputData(model))
                         .join('\n\n');
const mqttInputVariables = models.map((model) => generateMQTTInputVariables(model))
                         .join('\n\n');
const mqttFields = models.map((model) => generateMQTTFields(model))
                         .join('\n\n');

const mqttOutput = [mqttInputData, mqttInputVariables, mqttFields].join('\n\n');

fs.writeFileSync(outputGqlFileName, gqlOutput);
fs.writeFileSync(outputMqttFileName, mqttOutput);
console.log('Done!');







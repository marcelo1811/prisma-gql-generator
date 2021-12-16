const fs = require('fs');
const inquirer = require('inquirer')

const { prismaSchemaFile, outputGqlFileName, outputMqttFileName, outputMockedData, outputGqlPaths, outputMqttPaths } = require('./config');
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

const gqlOutput = [
                    ...models.map((model) => generateOutputGQL(model)),
                    'scalar Date',
                  ].join('\n\n');

const mqttOutput = models.map((model) => generateOutputMQTT(model))
                        .join('\n\n');
const mockedData = models.map((model) => generateMockedData(model))
                        .join('\n\n');



const questions = [
  {
    type: 'input',
    name: 'shouldUpdateMqttEdge',
    message: "Do you want to update variables.js from mqtt-edge (y/n)?"
  },
  {
    type: 'input',
    name: 'shouldUpdateMqttCloud',
    message: "Do you want to update variables.js mqtt-cloud (y/n)?"
  },
  {
    type: 'input',
    name: 'shouldUpdateTypesEdge',
    message: "Do you want to update typeDefs.gql from edge-back (y/n)?"
  },
  {
    type: 'input',
    name: 'shouldUpdateTypesCloud',
    message: "Do you want to update typeDefs.gql from cloud-back (y/n)?"
  },
]

function isEdge(path) {
  return path.includes('edge');
}

function isCloud(path) {
  return path.includes('cloud');
}

inquirer.prompt(questions).then(answers => {
  fs.writeFileSync(`outputs/${outputGqlFileName}`, gqlOutput);

  outputGqlPaths.forEach((path) => {
    if (
      (answers.shouldUpdateTypesEdge === 'y' && isEdge(path)) || (answers.shouldUpdateTypesCloud === 'y' && isCloud(path))
      ) {
      fs.writeFileSync(`${path}/${outputGqlFileName}`, gqlOutput);
    }
  });
  
  outputMqttPaths.forEach((path) => {
    if (
      (answers.shouldUpdateMqttEdge === 'y' && isEdge(path)) || (answers.shouldUpdateMqttCloud === 'y' && isCloud(path))
    ) {
      fs.writeFileSync(`${path}/${outputMqttFileName}`, mqttOutput);
    }
  });
  
  fs.writeFileSync(`outputs/${outputMockedData}`, mockedData);
  console.log('Done!');
})









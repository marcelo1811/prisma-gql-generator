const fs = require('fs');
const { fileToRead, outputFileName } = require('./config');
const generateModelGQLs = require('./services/generateModelGQLs');

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

fs.writeFileSync(outputFileName, gqlOutput);
console.log('Done!');







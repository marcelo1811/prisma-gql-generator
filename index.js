const fs = require('fs');

const fileToRead = 'gti.schema'

let schema
try {
  schema = fs.readFileSync(`${__dirname}/${fileToRead}`, 'utf-8')
} catch (err) {
  console.log(err)
}

let result = schema;

const startOfLineSpaceregex = /^\s*/gm;
result = result.replaceAll(startOfLineSpaceregex, '');

const columnArgsRegex = /\s*@.*/gm;
result = result.replaceAll(columnArgsRegex, '');

function transformLowerSneakCaseToUpperCamelCase(string) {
  const sneakCaseRegex = /(_\w)/gm;
  const capitalized = string.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  return capitalized.replace(sneakCaseRegex, (match, capture) => {
    return match.replace(capture, capture.toUpperCase().replace('_', ''))
  });
}

const modelNameRegex = /\s(\w*)\s{/gm;
result = result.replace(modelNameRegex, (match, capture) => {
  return transformLowerSneakCaseToUpperCamelCase(match)
})

const modelLineRegex = /model(.|\s)*?}/gm;
let models = result.match(modelLineRegex);
console.log(models)

models = models.map((model) => {
  let newModel = model.replace('model', 'type');
  let modelLines = newModel.split('\n');
  newModel = modelLines.map(line => {
    if (line.match(/({|})/g)) return line;
    const fields = line.trim().split(/\s+/g);

    fields[1] = transformLowerSneakCaseToUpperCamelCase(fields[1])
    const joined = '  '.concat(fields.join(': '))
    return joined.includes('?') ? joined.replace('?', '') : joined.concat('!');
  })
  return newModel.join('\n');
})

result = models.join('\n\n');

fs.writeFileSync('modelsResult.gql', result);







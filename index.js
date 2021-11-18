const fs = require('fs');

console.log('Starting...')
const fileToRead = 'prisma.schema';
const outputFileName = 'result.gql';

// TODO MARCELO: CORRIGIR LÓGICA E ADICIONAR TIPAGENS DO PRISMA
const validTypes = [
  'Int',
  'String',
  'Float',
  'Boolean',
  'Date',
  'ID',
]

let schema
try {
  schema = fs.readFileSync(`${__dirname}/${fileToRead}`, 'utf-8');
} catch (err) {
  console.log(err);
}

let result = schema;

const startOfLineSpaceregex = /^\s*/gm;
result = result.replace(startOfLineSpaceregex, '');

const columnArgsRegex = /\s*@.*/gm;
result = result.replace(columnArgsRegex, '');

function transformLowerSneakCaseToUpperCamelCase(string) {
  const sneakCaseRegex = /(_\w)/gm;
  const capitalized = string.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  return capitalized.replace(sneakCaseRegex, (match, capture) => {
    return match.replace(capture, capture.toUpperCase().replace('_', ''));
  });
}

const modelNameRegex = /\s(\w*)\s{/gm;
result = result.replace(modelNameRegex, (match, capture) => {
  return transformLowerSneakCaseToUpperCamelCase(match);
})

const modelLineRegex = /model(.|\s)*?}/gm;
let models = result.match(modelLineRegex);

// type
models = models.map((model) => {
  let newModel = model.replace('model', 'type');
  let modelLines = newModel.split('\n');
  newModel = modelLines.map(line => {
    if (line.match(/({|})/g)) return line;
    const fields = line.trim().split(/\s+/g);

    fields[1] = transformLowerSneakCaseToUpperCamelCase(fields[1])
    let joined = '  '.concat(fields.join(': '));
    
    joined = joined.includes('?') ? joined.replace('?', '') : joined.concat('!');

    if (!validTypes.some(v => joined.includes(v))) {
      // model fields
      joined = joined.replace('!', '');
      relationModelRegex = /(\w+)\[\]/g
      joined = joined.replace(relationModelRegex, (match, capture) => {
        return `[${capture}]`;
      })
    };
    joined = joined.replace('DateTime', 'Date');
    return joined;
  })

  // input
  newModelInput = modelLines.map(line => {
    if (line.match(/({|})/g)) {
      let newLine = line.split(' ');
      if (newLine.length !== 3) return line;
      newLine[0] = 'input'
      newLine[1] = newLine[1] + 'Input'
      return newLine.join(' ');
  };
    const fields = line.trim().split(/\s+/g);

    fields[1] = transformLowerSneakCaseToUpperCamelCase(fields[1])
    let joined = '  '.concat(fields.join(': '));

    if (!validTypes.some(v => joined.includes(v))) return;
    
    joined = joined.includes('?') ? joined.replace('?', '') : joined.concat('!');
    
    if (!validTypes.some(v => joined.includes(v))) {
      // model fields
      joined = joined.replace('!', '');
      relationModelRegex = /(\w+)\[\]/g
      joined = joined.replace(relationModelRegex, (match, capture) => {
        return `[${capture}]`;
      })
    };
    if (joined.includes('ukey')) {
      joined = joined.replace('!', '');
    }

    joined = joined.replace('DateTime', 'Date');
    return joined;
  })

  return [
    newModel.filter(line => line).join('\n'),
    newModelInput.filter(line => line).join('\n')
  ].join('\n\n');
})

result = models.join('\n\n');

fs.writeFileSync(outputFileName, result);
console.log('Done!');







const { transformValues } = require("./config");

function transformLowerSneakCaseToUpperCamelCase(string) {
  const sneakCaseRegex = /(_\w)/gm;
  const capitalized = string.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  return capitalized.replace(sneakCaseRegex, (match, capture) => {
    return match.replace(capture, capture.toUpperCase().replace('_', ''));
  });
}

function removeSpaceFromBeginOfLines(string) {
  const regex = /^\s+/gm;
  return string.replace(regex, '');
}

function removePrismaArgsFromLines(string) {
  const regex = /\s*@.*/gm;
  return string.replace(regex, '');
}

function transformModelNamesToUpperCamelCase(string) {
  const regex = /\s(\w*)\s{/gm;
  return string.replace(regex, (match, capture) => {
    return transformLowerSneakCaseToUpperCamelCase(match);
  })
}

function getAllModelsFromSchema(string) {
  const regex = /model(.|\s)*?}/gm;
  return string.match(regex);

}

function isColumnLine(line) {
  return !line.match(/({|})/g)
}

function getColumnTypeFromLine(line) {
  const [columnName, columnType] = line.trim().split(/\s+/g);
  return { columnName, columnType };
}

function converLineTypes(line) {
  let newLine = line;
  for (const key in transformValues) {
    if (line.includes(key)) {
      newLine = newLine.replace(key, transformValues[key]);
    }
  }
  return newLine;
}

const relationModelRegex = /(\w+)\[\]/g

module.exports = {
    transformLowerSneakCaseToUpperCamelCase: (string) => transformLowerSneakCaseToUpperCamelCase(string),
    removeSpaceFromBeginOfLines: (string) => removeSpaceFromBeginOfLines(string),
    removePrismaArgsFromLines: (string) => removePrismaArgsFromLines(string),
    transformModelNamesToUpperCamelCase: (string) => transformModelNamesToUpperCamelCase(string),
    getAllModelsFromSchema: (string) => getAllModelsFromSchema(string),
    isColumnLine: (line) => isColumnLine(line),
    getColumnTypeFromLine: (line) => getColumnTypeFromLine(line),
    converLineTypes: (line) => converLineTypes(line),
    relationModelRegex: relationModelRegex,
}
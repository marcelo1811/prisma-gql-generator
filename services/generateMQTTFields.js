const { basicTypes } = require("../config");
const { isColumnLine, getColumnTypeFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes, formatResult, modelRowRegex, downcaseFirstLetter } = require("../utils");

function generateMQTTFields(model) {
  let newModel = model.replace(modelRowRegex, (match, capture) => {
    return `export const ${downcaseFirstLetter(capture)}Fields = {`;
  })
  let modelLines = newModel.split('\n');
  
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    let newLine = `  ${columnName}`;
    
    newLine = newLine.replace('?', '');

    newLine = converLineTypes(newLine);
    return newLine;
  });

  return formatResult(result);
}

module.exports = generateMQTTFields;
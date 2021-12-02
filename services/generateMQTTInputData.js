const { basicTypes } = require("../config");
const { isColumnLine, getColumnTypeFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes, formatResult, modelRowRegex, downcaseFirstLetter } = require("../utils");

function generateMQTTInputVariables(model) {
  let newModel = model.replace(modelRowRegex, (match, capture) => {
    return `export const ${downcaseFirstLetter(capture)}Data = {`;
  })
  let modelLines = newModel.split('\n');
  
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    let newLine = `  $${columnName}: ${transformLowerSneakCaseToUpperCamelCase(columnType)}`;

    if (!basicTypes.some(v => newLine.includes(v))) return;
    
    newLine = newLine.replace('?', '');

    newLine = converLineTypes(newLine);

    newLine = newLine.replace(/\$(\w+).*/gm, (match, capture) => {
      return `${capture}: $${capture}`;
    });
    return newLine;
  });

  return formatResult(result);
}

module.exports = generateMQTTInputVariables;
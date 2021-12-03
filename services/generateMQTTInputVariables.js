const { basicTypes } = require("../config");
const { isColumnLine, getColumnTypeFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes, formatResult, modelRowRegex, downcaseFirstLetter } = require("../utils");

function generateMQTTInputVariables(model) {
  let newModel = model.replace(modelRowRegex, (match, capture) => {
    return `exports.${downcaseFirstLetter(capture)}InputVariables = {`;
  })
  let modelLines = newModel.split('\n');
  
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    columnType = columnType.replace('?', '');
    
    if (!basicTypes.some(v => v === columnType)) return;

    let newLine = `  $${columnName}: ${transformLowerSneakCaseToUpperCamelCase(columnType)}`;
    newLine = newLine.replace('?', '');
    newLine = converLineTypes(newLine);

    return newLine;
  });

  return formatResult(result);
}

module.exports = generateMQTTInputVariables;
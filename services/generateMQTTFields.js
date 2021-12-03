const { basicTypes, exportPrefix } = require("../config");
const { isColumnLine, getColumnTypeFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes, formatResult, modelRowRegex, downcaseFirstLetter } = require("../utils");

function generateMQTTFields(model) {
  let newModel = model.replace(modelRowRegex, (match, capture) => {
    return `${exportPrefix}${downcaseFirstLetter(capture)}Fields = {`;
  })
  let modelLines = newModel.split('\n');
  
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    columnType = columnType.replace('?', '');
    
    if (!basicTypes.some(v => v === columnType)) return;

    let newLine = `  ${columnName}`;
    newLine = newLine.replace('?', '');
    newLine = converLineTypes(newLine);

    return newLine;
  });

  return formatResult(result);
}

module.exports = generateMQTTFields;
const { basicTypes, exportPrefix } = require("../config");
const { isColumnLine, getColumnInfosFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes, formatResult, modelRowRegex, downcaseFirstLetter } = require("../utils");

function generateMQTTFields(model) {
  let newModel = model.replace(modelRowRegex, (match, capture) => {
    return `${exportPrefix}${downcaseFirstLetter(capture)}Fields = {`;
  })
  let modelLines = newModel.split('\n');
  
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType, isBasicType } = getColumnInfosFromLine(line);
    columnType = columnType.replace('?', '');
    
    if (!isBasicType) return;

    let newLine = `  ${columnName}`;
    newLine = newLine.replace('?', '');
    newLine = converLineTypes(newLine);

    return newLine;
  });

  return formatResult(result);
}

module.exports = generateMQTTFields;
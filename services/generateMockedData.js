const { basicTypes, mockedValues, exportPrefix } = require("../config");
const { isColumnLine, getColumnInfosFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes, formatResult, modelRowRegex, downcaseFirstLetter } = require("../utils");

function generateMockedData(model) {
  let newModel = model.replace(modelRowRegex, (match, capture) => {
    return `${exportPrefix}${downcaseFirstLetter(capture)}MockedData = {`;
  })
  let modelLines = newModel.split('\n');
  
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType, isBasicType } = getColumnInfosFromLine(line);
    columnType = columnType.replace('?', '');
    
    if (!isBasicType) return;

    let newLine = `  ${columnName}: ${mockedValues[columnType]},`;
    newLine = newLine.replace('?', '');
    newLine = converLineTypes(newLine);

    return newLine;
  });

  return formatResult(result);
}

module.exports = generateMockedData;
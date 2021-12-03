const { basicTypes, mockedValues, exportPrefix } = require("../config");
const { isColumnLine, getColumnTypeFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes, formatResult, modelRowRegex, downcaseFirstLetter } = require("../utils");

function generateMockedData(model) {
  let newModel = model.replace(modelRowRegex, (match, capture) => {
    return `${exportPrefix}${downcaseFirstLetter(capture)}ExampleData = {`;
  })
  let modelLines = newModel.split('\n');
  
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    columnType = columnType.replace('?', '');
    
    if (!basicTypes.some(v => v === columnType)) return;

    let newLine = `  ${columnName}: ${mockedValues[columnType]},`;
    newLine = newLine.replace('?', '');
    newLine = converLineTypes(newLine);

    return newLine;
  });

  return formatResult(result);
}

module.exports = generateMockedData;
const { basicTypes } = require("../config");
const { relationModelRegex, isColumnLine, transformLowerSneakCaseToUpperCamelCase, converLineTypes, getColumnInfosFromLine, formatResult } = require("./../utils");

function generateGQLInputs(modelLines) {
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) {
      let newLine = line.split(' ');
      if (newLine.length !== 3) return line;
      newLine[0] = 'input'
      newLine[1] = newLine[1] + 'Input'
      return newLine.join(' ');
  };
    
    let { columnName, columnType, isBasicType } = getColumnInfosFromLine(line);
    columnType = columnType.replace('?', '');
    
    if (!isBasicType) return;

    let newLine = `  ${columnName}: ${transformLowerSneakCaseToUpperCamelCase(columnType)}`;
    newLine = newLine.replace('?', '');
    newLine = converLineTypes(newLine);

    return newLine;
  })

  return formatResult(result);
}

module.exports = generateGQLInputs;
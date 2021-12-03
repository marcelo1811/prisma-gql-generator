const { basicTypes } = require("../config");
const { relationModelRegex, isColumnLine, transformLowerSneakCaseToUpperCamelCase, converLineTypes, getColumnTypeFromLine, formatResult } = require("./../utils");

function generateGQLInputs(modelLines) {
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) {
      let newLine = line.split(' ');
      if (newLine.length !== 3) return line;
      newLine[0] = 'input'
      newLine[1] = newLine[1] + 'Input'
      return newLine.join(' ');
  };
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    columnType = columnType.replace('?', '');
    
    if (!basicTypes.some(v => v === columnType)) return;

    let newLine = `  ${columnName}: ${transformLowerSneakCaseToUpperCamelCase(columnType)}`;
    newLine = newLine.replace('?', '');
    newLine = converLineTypes(newLine);

    return newLine;
  })

  return formatResult(result);
}

module.exports = generateGQLInputs;
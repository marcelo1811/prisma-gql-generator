const { basicTypes } = require("../config");
const { relationModelRegex, isColumnLine, transformLowerSneakCaseToUpperCamelCase, converLineTypes, getColumnTypeFromLine, formatResult } = require("./../utils");

function generateGQLTypes(modelLines) {
  const result = modelLines.map(line => {
    if (!isColumnLine(line)) return line;
    let { columnName, columnType } = getColumnTypeFromLine(line);
    let newLine = `  ${columnName}: ${transformLowerSneakCaseToUpperCamelCase(columnType)}`;
    
    newLine = newLine.includes('?') ? newLine.replace('?', '') : newLine.concat('!');

    if (!basicTypes.some(v => newLine.includes(v))) {
      // relationTypes
      newLine = newLine.replace('!', '');
      newLine = newLine.replace(relationModelRegex, (_match, capture) => {
        return `[${capture}]`;
      });
    };
    newLine = converLineTypes(newLine);
    return newLine;
  })

  return formatResult(result);
}

module.exports = generateGQLTypes;
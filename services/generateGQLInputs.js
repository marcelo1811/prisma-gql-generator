const { basicTypes } = require("../config");
const { relationModelRegex, isColumnLine, transformLowerSneakCaseToUpperCamelCase, converLineTypes, getColumnTypeFromLine } = require("./../utils");

function generateGQLInputs(modelLines) {
  return modelLines.map(line => {
    if (!isColumnLine(line)) {
      let newLine = line.split(' ');
      if (newLine.length !== 3) return line;
      newLine[0] = 'input'
      newLine[1] = newLine[1] + 'Input'
      return newLine.join(' ');
  };
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    let newLine = `  ${columnName}: ${transformLowerSneakCaseToUpperCamelCase(columnType)}`;

    if (!basicTypes.some(v => newLine.includes(v))) return;
    
    newLine = newLine.replace('?', '');
    
    if (!basicTypes.some(v => newLine.includes(v))) {
      // relationTypes
      newLine = newLine.replace(relationModelRegex, (_match, capture) => {
        return `[${capture}]`;
      });
    };

    newLine = converLineTypes(newLine);
    return newLine;
  })
}

module.exports = generateGQLInputs;
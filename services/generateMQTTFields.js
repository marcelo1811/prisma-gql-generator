const { basicTypes } = require("../config");
const { isColumnLine, getColumnTypeFromLine, transformLowerSneakCaseToUpperCamelCase, relationModelRegex, converLineTypes } = require("../utils");

function generateMQTTFields(model) {
  const regex = /model\s(\w+)\s{/gm;
  let newModel = model.replace(regex, (match, capture) => {
    const downcaseCapture = capture.charAt(0).toLowerCase() + capture.slice(1);
    return `export const ${downcaseCapture}Fields = {`;
  })
  let modelLines = newModel.split('\n');
  
  modelInputDef = modelLines.map(line => {
    if (!isColumnLine(line)) return line.replace(/(\{|\})/, '`');
    
    let { columnName, columnType } = getColumnTypeFromLine(line);
    let newLine = `  ${columnName}`;
    
    newLine = newLine.replace('?', '');

    newLine = converLineTypes(newLine);
    return newLine;
  });

  return modelInputDef.filter(line => line).join('\n');
}

module.exports = generateMQTTFields;
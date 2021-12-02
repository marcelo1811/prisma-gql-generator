const generateGQLInputs = require("./generateGQLInputs");
const generateGQLTypes = require("./generateGQLTypes");

function generateModelGQLs(model) {
  let modelTypeDef = model.replace('model', 'type');
  let modelLines = modelTypeDef.split('\n');
  
  // generate GQL types
  modelTypeDef = generateGQLTypes(modelLines);
  
  // generate GQL inputs
  modelInputDef = generateGQLInputs(modelLines);
  
  return [
    modelTypeDef.filter(line => line).join('\n'),
    modelInputDef.filter(line => line).join('\n')
  ].join('\n\n');
}

module.exports = generateModelGQLs;
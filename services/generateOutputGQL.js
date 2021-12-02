const generateGQLInputs = require("./generateGQLInputs");
const generateGQLTypes = require("./generateGQLTypes");

function generateOutputGQL(model) {
  let modelTypeDef = model.replace('model', 'type');
  let modelLines = modelTypeDef.split('\n');
  
  // generate GQL types
  modelTypeDef = generateGQLTypes(modelLines);
  
  // generate GQL inputs
  modelInputDef = generateGQLInputs(modelLines);
  
  return [
    modelTypeDef,
    modelInputDef
  ].join('\n\n');
}

module.exports = generateOutputGQL;
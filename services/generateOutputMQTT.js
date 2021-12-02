const generateMQTTFields = require('./generateMQTTFields');
const generateMQTTInputData = require('./generateMQTTInputData');
const generateMQTTInputVariables = require('./generateMQTTInputVariables');

function generateOutputMQTT(model) {
  const mqttInputData = generateMQTTInputData(model);
  const mqttInputVariables = generateMQTTInputVariables(model);
  const mqttFields = generateMQTTFields(model);

  return [
    mqttInputData,
    mqttInputVariables,
    mqttFields
  ].join('\n');
}

module.exports = generateOutputMQTT;
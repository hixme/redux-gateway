'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// singleton gateway interface
var gateway = exports.gateway = null;

// set client config
var setGateway = exports.setGateway = function setGateway(apigClient) {
  exports.gateway = gateway = apigClient;
};

var createError = function createError(message) {
  var status = 500;

  if (message === 'Process exited before completing request') {
    message = 'An unknown error occurred';
    status = 520;
  }

  var e = {
    status: status,
    statusText: message,
    message: message
  };

  console.error('API error: ' + JSON.stringify(e));

  return e;
};

var gatewayRequest = exports.gatewayRequest = function gatewayRequest(route) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      params = _ref.params,
      body = _ref.body,
      additionalParams = _ref.additionalParams;

  return new Promise(function (resolve, reject) {
    if (!gateway[route]) {
      reject(createError({
        status: 999,
        message: 'redux-gateway: ' + route + ' not available. Is this endpoint available in your environment?'
      }));
    } else {
      gateway[route](params, body, additionalParams).then(function (response) {
        var data = response.data;

        // if data is null - throw error :: data should not be null
        // else if data.errorMessage is present - throw error
        // else resolve

        if (data === null) {
          reject(createError('Bad response from server. API should not return null'));
        } else if (data.errorMessage) {
          reject(createError(data.errorMessage));
        } else {
          resolve(data);
        }
      }, function (error) {
        reject(createError(error));
      });
    }
  });
};
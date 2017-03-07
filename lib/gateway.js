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
  var status = 400;

  if (message === 'Process exited before completing request') {
    message = 'An unknown error occurred';
    status = 520;
  }

  var e = {
    status: status,
    statusText: message,
    message: message
  };

  return e;
};

var gatewayRequest = exports.gatewayRequest = function gatewayRequest(route) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      params = _ref.params,
      body = _ref.body,
      additionalParams = _ref.additionalParams;

  return new Promise(function (resolve, reject) {
    gateway[route](params, body, additionalParams).then(function (response) {
      var data = response.data;
      if (data.errorMessage) {
        reject(createError(data.errorMessage));
      } else {
        resolve(data);
      }
    }, function (error) {
      reject(createError(error));
    });
  });
};
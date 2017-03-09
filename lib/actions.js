'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retryRequestByName = exports.createRequest = exports.clearRequest = exports.requestComplete = exports.requestFailure = exports.requestSuccess = exports.requestInit = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _gateway = require('./gateway');

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_RETRY_ATTEMPTS = 3;

var requestInit = exports.requestInit = function requestInit(params) {
  return {
    type: _actionTypes2.default.REQUEST_INIT,
    payload: params
  };
};

var requestSuccess = exports.requestSuccess = function requestSuccess(name, response) {
  return {
    type: _actionTypes2.default.REQUEST_SUCCESS,
    payload: {
      name: name,
      response: response
    }
  };
};

var requestFailure = exports.requestFailure = function requestFailure(name, error) {
  return {
    type: _actionTypes2.default.REQUEST_FAILURE,
    payload: {
      name: name,
      error: error
    }
  };
};

var requestComplete = exports.requestComplete = function requestComplete(name) {
  return {
    type: _actionTypes2.default.REQUEST_COMPLETE,
    payload: {
      name: name
    }
  };
};

var clearRequest = exports.clearRequest = function clearRequest(name) {
  return {
    type: _actionTypes2.default.REQUEST_CLEAR,
    payload: {
      name: name
    }
  };
};

var createRequest = exports.createRequest = function createRequest(_ref) {
  var route = _ref.route,
      params = _ref.params,
      body = _ref.body,
      name = _ref.name,
      _ref$retry = _ref.retry,
      retry = _ref$retry === undefined ? false : _ref$retry;

  name = name || route;
  return function (dispatch, getState) {
    var request = (0, _gateway.gatewayRequest)(route, { params: params, body: body });
    dispatch(requestInit({ name: name, route: route, params: params, body: body, request: request, retry: retry }));

    request.then(function (data) {
      dispatch(requestSuccess(name, data));
      dispatch(requestComplete(name));
    }, function (error) {
      // if there's an error, we should retry the request before completing or logging an error
      var requestModel = (0, _selectors.getRequestByName)(getState(), name);
      if (requestModel.attempts < MAX_RETRY_ATTEMPTS) {
        dispatch(retryRequestByName(name));
      } else {
        dispatch(requestFailure(name, error));
        dispatch(requestComplete(name));
      }
    });

    return request;
  };
};

var retryRequestByName = exports.retryRequestByName = function retryRequestByName(requestName) {
  return function (dispatch, getState) {
    var requestModel = (0, _selectors.getRequestByName)(getState(), requestName);

    // if the request is retried 3 times already, stop
    if (requestModel.attempts > MAX_RETRY_ATTEMPTS) return;

    return dispatch(createRequest(_extends({}, requestModel, { retry: true })));
  };
};
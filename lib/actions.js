'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRequest = exports.requestComplete = exports.requestFailure = exports.requestSuccess = exports.requestInit = undefined;

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _gateway = require('./gateway');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestInit = exports.requestInit = function requestInit(name) {
  return {
    type: _actionTypes2.default.REQUEST_INIT,
    payload: {
      name: name
    }
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

var createRequest = exports.createRequest = function createRequest(_ref) {
  var route = _ref.route;
  var params = _ref.params;
  var body = _ref.body;
  var name = _ref.name;

  name = name || route;
  return function (dispatch) {
    dispatch(requestInit(name));
    return (0, _gateway.gatewayRequest)(route, { params: params, body: body }).then(function (data) {
      dispatch(requestSuccess(name, data));
      dispatch(requestComplete(name));
    }, function (error) {
      dispatch(requestFailure(name, error));
      dispatch(requestComplete(name));
    });
  };
};
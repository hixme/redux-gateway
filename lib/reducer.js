'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _reduxUtils = require('modules/redux-utils');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _requestReducer = require('./request-reducer');

var _requestReducer2 = _interopRequireDefault(_requestReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  client: null,
  requests: {},
  totalProcessing: 0,
  totalComplete: 0,
  totalFailure: 0,
  totalSuccess: 0
};

exports.default = (0, _reduxUtils.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _actionTypes2.default.SET_CLIENT, function (state, client) {
  return Object.assign({}, state, {
    client: client
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_INIT, function (state, payload) {
  var request = (0, _requestReducer2.default)(undefined, { type: _actionTypes2.default.REQUEST_INIT, payload: payload });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));
  return Object.assign({}, state, {
    totalProcessing: ++state.totalProcessing,
    requests: requests
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_SUCCESS, function (state, payload) {
  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_SUCCESS, payload: payload });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));
  return Object.assign({}, state, {
    totalSuccess: ++state.totalSuccess,
    requests: requests
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_FAILURE, function (state, payload) {
  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_FAILURE, payload: payload });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));

  return Object.assign({}, state, {
    totalFailure: ++state.totalFailure,
    requests: requests
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_COMPLETE, function (state, payload) {
  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_COMPLETE });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));

  return Object.assign({}, state, {
    totalProcessing: --state.totalProcessing,
    totalComplete: ++state.totalComplete,
    requests: requests
  });
}), _createReducer));
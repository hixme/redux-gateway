'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _reduxUtils = require('./redux-utils');

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

exports.default = (0, _reduxUtils.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _actionTypes2.default.REQUEST_INIT, function (state, payload) {
  // if the request is processing, we need to decrement it
  var totalProcessing = state.totalProcessing;
  // const { isProcessing } = state.requests[payload.name] || {}
  // if (isProcessing) {
  //   --totalProcessing
  // }

  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_INIT, payload: payload });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));

  ++totalProcessing;
  return Object.assign({}, state, {
    // prevent totalProcessing from becoming less than zero
    totalProcessing: totalProcessing < 1 ? 1 : totalProcessing,
    requests: requests
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_SUCCESS, function (state, payload) {
  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_SUCCESS, payload: payload });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));

  return Object.assign({}, state, {
    totalSuccess: state.totalSuccess + 1,
    requests: requests
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_FAILURE, function (state, payload) {
  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_FAILURE, payload: payload });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));

  return Object.assign({}, state, {
    totalFailure: state.totalFailure + 1,
    requests: requests
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_COMPLETE, function (state, payload) {
  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_COMPLETE });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));

  return Object.assign({}, state, {
    totalProcessing: state.totalProcessing - 1,
    totalComplete: state.totalComplete + 1,
    requests: requests
  });
}), _defineProperty(_createReducer, _actionTypes2.default.REQUEST_CLEAR, function (state, payload) {
  // if the request is processing, we need to decrement it
  // const { isProcessing } = state.requests[payload.name] || {}
  // const totalProcessing = (isProcessing) ? --state.totalProcessing : state.totalProcessing

  var request = (0, _requestReducer2.default)(state.requests[payload.name], { type: _actionTypes2.default.REQUEST_CLEAR });

  var requests = Object.assign({}, state.requests, _defineProperty({}, payload.name, request));

  return Object.assign({}, state, {
    requests: requests
    // totalProcessing
  });
}), _createReducer));
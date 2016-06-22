'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestModel = undefined;

var _reducerMap;

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requestModel = exports.requestModel = {
  name: '',
  response: null,
  error: null,
  isProcessing: false,
  isFailure: false,
  isSuccess: false,
  isComplete: false,
  lastModified: null
};

var reducerMap = (_reducerMap = {}, _defineProperty(_reducerMap, _actionTypes2.default.REQUEST_INIT, function (state, payload) {
  return Object.assign({}, state, {
    name: payload.name,
    isProcessing: true,
    lastModified: new Date()
  });
}), _defineProperty(_reducerMap, _actionTypes2.default.REQUEST_SUCCESS, function (state, payload) {
  return Object.assign({}, state, {
    response: payload.response,
    isSuccess: true,
    isFailure: false,
    error: null,
    lastModified: new Date()
  });
}), _defineProperty(_reducerMap, _actionTypes2.default.REQUEST_FAILURE, function (state, payload) {
  return Object.assign({}, state, {
    response: null,
    isSuccess: false,
    isFailure: true,
    error: payload.error,
    lastModified: new Date()
  });
}), _defineProperty(_reducerMap, _actionTypes2.default.REQUEST_COMPLETE, function (state) {
  return Object.assign({}, state, {
    isProcessing: false,
    isComplete: true,
    lastModified: new Date()
  });
}), _reducerMap);

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? requestModel : arguments[0];
  var action = arguments[1];

  var reducer = reducerMap[action.type];

  return reducer ? reducer(state, action.payload) : state;
};
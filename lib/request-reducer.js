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
  id: 0, // incremented after each request
  name: '',
  displayName: '',

  type: null,
  route: null,
  params: null,
  body: null,
  request: null,

  response: null,
  error: null,

  isRefreshing: false,
  isProcessing: false,
  isFailure: false,
  isSuccess: false,
  isComplete: false,
  isRetrying: false,

  lastModified: null,
  attempts: 0
};

var reducerMap = (_reducerMap = {}, _defineProperty(_reducerMap, _actionTypes2.default.REQUEST_INIT, function (state, payload) {
  var request = payload.request,
      _payload$route = payload.route,
      route = _payload$route === undefined ? '' : _payload$route,
      params = payload.params,
      body = payload.body,
      name = payload.name,
      retry = payload.retry;

  // Split camel cased route name to a readable name
  // example: clientEmployeesGet transforms to Client Employees Get

  var camelCaseName = route.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });
  var names = camelCaseName.split(' ');
  var type = names.pop().toUpperCase();
  var displayName = names.join(' ');

  var isRefreshing = !!state.response;

  return Object.assign({}, state, {
    id: ++state.id,
    name: name,
    displayName: displayName,
    type: type,
    route: route,

    params: params,
    body: body,

    request: request,
    error: null,

    isRefreshing: isRefreshing,
    isProcessing: true,
    isSuccess: false,
    isFailure: false,
    isComplete: false,
    isRetrying: retry,

    attempts: retry ? ++state.attempts : 1,
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
    isRefreshing: false,
    isProcessing: false,
    isComplete: true,
    lastModified: new Date()
  });
}), _defineProperty(_reducerMap, _actionTypes2.default.REQUEST_CLEAR, function (state) {
  return requestModel;
}), _reducerMap);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requestModel;
  var action = arguments[1];

  var reducer = reducerMap[action.type];

  return reducer ? reducer(state, action.payload) : state;
};
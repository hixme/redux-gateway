'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retryRequestByName = exports.clearRequest = exports.createRequest = exports.getBodyByRequestName = exports.getParamsByRequestName = exports.getRouteByRequestName = exports.getResponseByRequestName = exports.getRequestByName = exports.isDebug = exports.getRecentErrors = exports.getStats = exports.connectRequest = exports.setGateway = undefined;

var _gateway = require('./gateway');

Object.defineProperty(exports, 'setGateway', {
  enumerable: true,
  get: function get() {
    return _gateway.setGateway;
  }
});

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _connectRequest2 = require('./connectRequest');

var _connectRequest3 = _interopRequireDefault(_connectRequest2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.connectRequest = _connectRequest3.default;

// selectors

var getStats = exports.getStats = selectors.getStats;
var getRecentErrors = exports.getRecentErrors = selectors.getRecentErrors;
var isDebug = exports.isDebug = selectors.isDebug;

var getRequestByName = exports.getRequestByName = selectors.getRequestByName;
var getResponseByRequestName = exports.getResponseByRequestName = selectors.getResponseByRequestName;
var getRouteByRequestName = exports.getRouteByRequestName = selectors.getRouteByRequestName;
var getParamsByRequestName = exports.getParamsByRequestName = selectors.getParamsByRequestName;
var getBodyByRequestName = exports.getBodyByRequestName = selectors.getBodyByRequestName;

// actions
var createRequest = exports.createRequest = actions.createRequest;
var clearRequest = exports.clearRequest = actions.clearRequest;
var retryRequestByName = exports.retryRequestByName = actions.retryRequestByName;

exports.default = {
  actions: actions,
  actionTypes: _actionTypes2.default,
  constants: constants,
  selectors: selectors,
  reducer: _reducer2.default
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBodyByRequestName = exports.getParamsByRequestName = exports.getRouteByRequestName = exports.getResponseByRequestName = exports.getRequestByName = exports.getRecentErrors = exports.getRecentRequests = exports.getAllRequests = exports.getStats = exports.isDebug = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reselect = require('reselect');

var _constants = require('./constants.js');

var _requestReducer = require('./request-reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PROD DEBUG
var REDUX_GATEWAY_LS_KEY = 'rgbugstat';
if (window.location.search.indexOf('hixbug') !== -1) {
  localStorage.setItem(REDUX_GATEWAY_LS_KEY, new Date());
}
var lsTimestamp = localStorage.getItem(REDUX_GATEWAY_LS_KEY);

// remove hixbug after 60 minutes
if (lsTimestamp && (0, _moment2.default)(null, 'MM/DD/YYYY').diff(lsTimestamp, 'seconds') > 60 * 60 * 1000) {
  localStorage.removeItem(REDUX_GATEWAY_LS_KEY);
}

var isDebug = exports.isDebug = function isDebug() {
  return !!localStorage.getItem(REDUX_GATEWAY_LS_KEY);
};

var getStats = exports.getStats = (0, _reselect.createSelector)(function (state) {
  return state[_constants.NAME];
}, function (gateway) {
  var totalProcessing = gateway.totalProcessing,
      totalSuccess = gateway.totalSuccess,
      totalFailure = gateway.totalFailure,
      totalComplete = gateway.totalComplete;


  return {
    totalProcessing: totalProcessing,
    totalSuccess: totalSuccess,
    totalFailure: totalFailure,
    totalComplete: totalComplete
  };
});

var getAllRequests = exports.getAllRequests = (0, _reselect.createSelector)(function (state) {
  return state[_constants.NAME];
},
// return empty object if reducer hasn't been initialized
function (gateway) {
  return gateway ? gateway.requests : {};
});

var getRecentRequests = exports.getRecentRequests = (0, _reselect.createSelector)(getAllRequests, function (requests) {
  var reqArray = Object.values(requests);
  var result = {
    processing: [],
    errors: []
  };

  return reqArray.reduce(function (prev, curr) {
    var isProcessing = curr.isProcessing,
        isFailure = curr.isFailure,
        lastModified = curr.lastModified,
        type = curr.type;

    var diffSeconds = (0, _moment2.default)().diff(lastModified, 'seconds');

    if (type === 'GET' && diffSeconds < 10) {
      if (isFailure) {
        prev.errors.push(curr);
      }

      if (isProcessing) {
        prev.processing.push(curr);
      }
    }

    return prev;
  }, result);
});

var getRecentErrors = exports.getRecentErrors = (0, _reselect.createSelector)(getAllRequests, function (requests) {
  var reqArray = Object.values(requests);
  return reqArray.length > 0 ? reqArray.reduce(function (prev, curr) {
    var isFailure = curr.isFailure,
        lastModified = curr.lastModified;

    var diffMinutes = (0, _moment2.default)().diff(lastModified, 'minutes');

    // if there is an error and the error is older than 10 minutes
    if (isFailure && diffMinutes < 5) {
      prev.push(curr);
    }

    return prev;
  }, []) : [];
});

var getRequestByName = exports.getRequestByName = function getRequestByName(state, routeName) {
  return getAllRequests(state)[routeName] || _requestReducer.requestModel;
};

var getResponseByRequestName = exports.getResponseByRequestName = function getResponseByRequestName(state, routeName) {
  return getRequestByName(state, routeName).response;
};

var getRouteByRequestName = exports.getRouteByRequestName = function getRouteByRequestName(state, routeName) {
  return getRequestByName(state, routeName).route;
};

var getParamsByRequestName = exports.getParamsByRequestName = function getParamsByRequestName(state, routeName) {
  return getRequestByName(state, routeName).params;
};

var getBodyByRequestName = exports.getBodyByRequestName = function getBodyByRequestName(state, routeName) {
  return getRequestByName(state, routeName).body;
};
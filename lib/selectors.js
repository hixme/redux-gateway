'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestByName = exports.getAllRequests = undefined;

var _constants = require('./constants.js');

var _reselect = require('reselect');

var _requestReducer = require('./request-reducer');

var getAllRequests = exports.getAllRequests = (0, _reselect.createSelector)(function (state) {
  return state[_constants.NAME];
}, function (gateway) {
  // return empty object if reducer hasn't been initialized
  return gateway ? gateway.requests : {};
});

var getRequestByName = exports.getRequestByName = function getRequestByName(state, routeName) {
  return getAllRequests(state)[routeName] || _requestReducer.requestModel;
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REQUEST_COMPLETE = exports.REQUEST_FAILURE = exports.REQUEST_SUCCESS = exports.REQUEST_INIT = exports.SET_CLIENT = undefined;

var _reduxUtils = require('modules/redux-utils');

var _constants = require('./constants');

var SET_CLIENT = exports.SET_CLIENT = 'SET_CLIENT';
var REQUEST_INIT = exports.REQUEST_INIT = 'REQUEST_INIT';
var REQUEST_SUCCESS = exports.REQUEST_SUCCESS = 'REQUEST_SUCCESS';
var REQUEST_FAILURE = exports.REQUEST_FAILURE = 'REQUEST_FAILURE';
var REQUEST_COMPLETE = exports.REQUEST_COMPLETE = 'REQUEST_COMPLETE';

exports.default = (0, _reduxUtils.namespaceActions)(_constants.NAME)([SET_CLIENT, REQUEST_INIT, REQUEST_SUCCESS, REQUEST_FAILURE, REQUEST_COMPLETE]);
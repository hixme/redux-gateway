'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REQUEST_CLEAR = exports.REQUEST_COMPLETE = exports.REQUEST_FAILURE = exports.REQUEST_SUCCESS = exports.REQUEST_INIT = undefined;

var _reduxUtils = require('./redux-utils');

var _constants = require('./constants');

var REQUEST_INIT = exports.REQUEST_INIT = 'REQUEST_INIT';
var REQUEST_SUCCESS = exports.REQUEST_SUCCESS = 'REQUEST_SUCCESS';
var REQUEST_FAILURE = exports.REQUEST_FAILURE = 'REQUEST_FAILURE';
var REQUEST_COMPLETE = exports.REQUEST_COMPLETE = 'REQUEST_COMPLETE';
var REQUEST_CLEAR = exports.REQUEST_CLEAR = 'REQUEST_CLEAR';

exports.default = (0, _reduxUtils.namespaceActions)(_constants.NAME)([REQUEST_INIT, REQUEST_SUCCESS, REQUEST_FAILURE, REQUEST_COMPLETE, REQUEST_CLEAR]);
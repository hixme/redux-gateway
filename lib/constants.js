'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAME = exports.NAME = 'reduxGateway';

var SET_CLIENT = exports.SET_CLIENT = 'SET_CLIENT';
var REQUEST_INIT = exports.REQUEST_INIT = 'REQUEST_INIT';
var REQUEST_SUCCESS = exports.REQUEST_SUCCESS = 'REQUEST_SUCCESS';
var REQUEST_FAILURE = exports.REQUEST_FAILURE = 'REQUEST_FAILURE';
var REQUEST_COMPLETE = exports.REQUEST_COMPLETE = 'REQUEST_COMPLETE';

exports.default = [SET_CLIENT, REQUEST_INIT, REQUEST_SUCCESS, REQUEST_FAILURE, REQUEST_COMPLETE];
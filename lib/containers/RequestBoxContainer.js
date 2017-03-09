'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _components = require('../components');

var _selectors = require('../selectors');

exports.default = (0, _reactRedux.connect)(function (state) {
  return (0, _selectors.getRecentRequests)(state);
})(_components.RequestBox);
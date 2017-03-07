'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _selectors = require('../selectors');

var _components = require('../components');

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    totalFailure: (0, _selectors.getStats)(state).totalFailure,
    errors: (0, _selectors.getRecentErrors)(state)
  };
})(_components.ViewErrorDetailsModal);
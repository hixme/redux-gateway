'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _modal = require('modules/modal');

var _modal2 = _interopRequireDefault(_modal);

var _SystemReport = require('../components/SystemReport');

var _SystemReport2 = _interopRequireDefault(_SystemReport);

var _ViewErrorDetailsContainer = require('./ViewErrorDetailsContainer');

var _ViewErrorDetailsContainer2 = _interopRequireDefault(_ViewErrorDetailsContainer);

var _selectors = require('../selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state) {
  var _getStats = (0, _selectors.getStats)(state),
      totalProcessing = _getStats.totalProcessing,
      totalComplete = _getStats.totalComplete,
      totalFailure = _getStats.totalFailure,
      totalSuccess = _getStats.totalSuccess;

  var errors = (0, _selectors.getRecentErrors)(state);

  return {
    isDebug: (0, _selectors.isDebug)(),
    errors: errors,
    totalProcessing: totalProcessing,
    totalComplete: totalComplete,
    totalFailure: totalFailure,
    totalSuccess: totalSuccess
  };
}, function (dispatch) {
  return {
    viewErrorDetails: function viewErrorDetails() {
      dispatch(_modal2.default.actions.setViewAndShowModal(_ViewErrorDetailsContainer2.default));
    }
  };
})(_SystemReport2.default);
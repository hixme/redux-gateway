'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('hixme-ui/lib/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Text = require('hixme-ui/lib/Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SystemReport = function SystemReport(_ref) {
  var isDebug = _ref.isDebug,
      totalProcessing = _ref.totalProcessing,
      totalSuccess = _ref.totalSuccess,
      totalFailure = _ref.totalFailure,
      totalComplete = _ref.totalComplete,
      viewErrorDetails = _ref.viewErrorDetails;

  if (!isDebug) return _react2.default.createElement('div', null);

  // Show API Error list when command + option + v is pressed
  window.addEventListener('keydown', function (event) {
    var altKey = event.altKey,
        metaKey = event.metaKey,
        keyCode = event.keyCode;


    if (altKey && metaKey && keyCode === 86) {
      viewErrorDetails();
    }
  });

  return _react2.default.createElement(
    _Container2.default,
    {
      noPadding: true,
      style: {
        position: 'fixed',
        bottom: 10,
        left: 10,
        zIndex: '10000000000000',
        color: 'white'
      }
    },
    _react2.default.createElement(
      'div',
      { style: { width: '130px' } },
      totalProcessing > 0 && _react2.default.createElement(
        _Container2.default,
        { purple: true, rounded: true, marginBottom: '3px', padding: '10px' },
        '(',
        totalProcessing,
        ') Processing...'
      ),
      _react2.default.createElement(
        _Container2.default,
        { green: true, rounded: true, marginBottom: '3px', padding: '10px' },
        '(',
        totalSuccess,
        ') Success'
      ),
      _react2.default.createElement(
        _Text2.default,
        { onClick: viewErrorDetails, cursor: 'pointer' },
        _react2.default.createElement(
          _Container2.default,
          { red: true, rounded: true, marginBottom: '3px', padding: '10px' },
          '(',
          totalFailure,
          ') Failure'
        )
      ),
      _react2.default.createElement(
        _Container2.default,
        { blue: true, rounded: true, marginBottom: '3px', padding: '10px' },
        '(',
        totalComplete,
        ') Complete'
      )
    )
  );
};

SystemReport.displayName = 'SystemReport';
SystemReport.propTypes = {
  isDebug: _react2.default.PropTypes.bool.isRequired,
  totalProcessing: _react2.default.PropTypes.number.isRequired,
  totalSuccess: _react2.default.PropTypes.number.isRequired,
  totalFailure: _react2.default.PropTypes.number.isRequired,
  totalComplete: _react2.default.PropTypes.number.isRequired,
  viewErrorDetails: _react2.default.PropTypes.func.isRequired
};

exports.default = SystemReport;
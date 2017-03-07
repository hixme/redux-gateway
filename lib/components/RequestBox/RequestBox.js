'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('hixme-ui/lib/Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestBox = function RequestBox(_ref) {
  var processing = _ref.processing,
      errors = _ref.errors;
  return _react2.default.createElement(
    _Container2.default,
    {
      noPadding: true,
      style: {
        position: 'absolute',
        top: 57,
        left: 0,
        color: 'white',
        fontSize: 11
      }
    },
    processing.length > 0 && _react2.default.createElement(
      _Container2.default,
      { blue: true, padding: '4px', style: { display: 'inline-block' } },
      '...'
    ),
    processing.length === 0 && errors.length > 0 && _react2.default.createElement(
      _Container2.default,
      { red: true, padding: '4px', style: { display: 'inline-block' } },
      '*error loading'
    )
  );
};

RequestBox.displayName = 'RequestBox';
RequestBox.propTypes = {
  processing: _react2.default.PropTypes.array.isRequired,
  errors: _react2.default.PropTypes.array.isRequired
};

exports.default = RequestBox;
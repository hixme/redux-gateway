'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

// TODO: we need a global module for modals. Possibly from hixme-ui


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _Container = require('hixme-ui/lib/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Title = require('hixme-ui/lib/Title');

var _Title2 = _interopRequireDefault(_Title);

var _modal = require('modules/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewErrorDetailsModal = (_dec = _modal2.default.containers.Modal({
  content: {
    position: 'top',
    size: 'medium',
    styles: {
      width: '100%',
      margin: '50px 0 0 0'
    }
  },
  overlay: {
    hideCloseButton: false,
    routeOnHide: false,
    dark: false
  }
}), _dec(_class = function (_React$Component) {
  _inherits(ViewErrorDetailsModal, _React$Component);

  function ViewErrorDetailsModal() {
    _classCallCheck(this, ViewErrorDetailsModal);

    return _possibleConstructorReturn(this, (ViewErrorDetailsModal.__proto__ || Object.getPrototypeOf(ViewErrorDetailsModal)).apply(this, arguments));
  }

  _createClass(ViewErrorDetailsModal, [{
    key: 'render',
    value: function render() {
      var errors = this.props.errors;


      var cellStyle = {
        padding: '5px 10px'
      };

      var getValue = function getValue(value) {
        if (value === undefined) return 'undefined';
        if (value === null) return 'null';
        if (value === 0) return '0';
        if (('' + value).length === 0) return 'Empty string';

        return value;
      };

      var parseObject = function parseObject(obj) {
        obj = obj || {};
        return Object.keys(obj).map(function (key) {
          return _react2.default.createElement(
            _Container2.default,
            { noPadding: true, marginBottom: '3px', key: (0, _v2.default)() },
            key,
            ': ',
            getValue(obj[key])
          );
        });
      };

      return _react2.default.createElement(
        _Container2.default,
        null,
        _react2.default.createElement(
          _Title2.default,
          { red: true },
          'API Errors'
        ),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { style: cellStyle },
                'Type'
              ),
              _react2.default.createElement(
                'th',
                { style: cellStyle },
                'Route'
              ),
              _react2.default.createElement(
                'th',
                { style: cellStyle },
                'Status'
              ),
              _react2.default.createElement(
                'th',
                { style: cellStyle },
                'Params'
              ),
              _react2.default.createElement(
                'th',
                { style: cellStyle },
                'Body'
              ),
              _react2.default.createElement(
                'th',
                { style: cellStyle },
                'Message'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            errors.map(function (req) {
              var type = req.type,
                  route = req.route,
                  displayName = req.displayName,
                  error = req.error,
                  params = req.params,
                  body = req.body;

              return _react2.default.createElement(
                'tr',
                { key: error.route },
                _react2.default.createElement(
                  'td',
                  { style: cellStyle },
                  type
                ),
                _react2.default.createElement(
                  'td',
                  { style: cellStyle },
                  route
                ),
                _react2.default.createElement(
                  'td',
                  { style: cellStyle },
                  displayName
                ),
                _react2.default.createElement(
                  'td',
                  { style: cellStyle },
                  error.status
                ),
                _react2.default.createElement(
                  'td',
                  { style: cellStyle },
                  parseObject(params)
                ),
                _react2.default.createElement(
                  'td',
                  { style: cellStyle },
                  parseObject(body)
                ),
                _react2.default.createElement(
                  'td',
                  { style: cellStyle },
                  error.message
                )
              );
            })
          )
        )
      );
    }
  }]);

  return ViewErrorDetailsModal;
}(_react2.default.Component)) || _class);


ViewErrorDetailsModal.displayName = 'ViewErrorDetailsModal';
ViewErrorDetailsModal.propTypes = {
  errors: _react2.default.PropTypes.array.isRequired
};

exports.default = ViewErrorDetailsModal;
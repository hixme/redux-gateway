'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (params) {
  var routeName = params.name || params.route;
  if (!routeName) {
    console.error('connectRequest: route is a required parameter');
  }

  return function (View) {
    var GatewayEvent = function (_Component) {
      _inherits(GatewayEvent, _Component);

      function GatewayEvent() {
        _classCallCheck(this, GatewayEvent);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(GatewayEvent).apply(this, arguments));
      }

      _createClass(GatewayEvent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var requestOnMount = params.requestOnMount;
          var requestOnMountParams = params.requestOnMountParams;
          var requestOnMountBody = params.requestOnMountBody;

          // make a request on mount if needed

          if (requestOnMount || requestOnMountParams || requestOnMountBody) {
            var route = params.route;
            var name = params.name;


            var requestParams = {
              route: route,
              name: name,
              params: requestOnMountParams,
              body: requestOnMountBody
            };

            this.props.dispatch(this.props.createRequest(requestParams));
          }
          this.checkEvents();
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          this.checkEvents(nextProps);
        }
      }, {
        key: 'checkEvents',
        value: function checkEvents(props) {
          if (!props) return;

          var prevPropRequest = this.props.request;
          var request = props.request;
          var isProcessing = request.isProcessing;
          var isSuccess = request.isSuccess;
          var isFailure = request.isFailure;
          var isComplete = request.isComplete;


          if (isFailure && isFailure !== prevPropRequest.isFailure && params.onFailure) {
            params.onFailure(request, this.props.dispatch);
          }

          if (isProcessing && isProcessing !== prevPropRequest.isProcessing && params.onProcessing) {
            params.onProcessing(request, this.props.dispatch);
          }

          if (isSuccess && isSuccess !== prevPropRequest.isSuccess && params.onSuccess) {
            params.onSuccess(request, this.props.dispatch);
          }

          if (isComplete && isComplete !== prevPropRequest.isComplete && params.onComplete) {
            params.onComplete(request, this.props.dispatch);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(View, this.props);
        }
      }]);

      return GatewayEvent;
    }(_react.Component);

    GatewayEvent.propTypes = {
      request: _react.PropTypes.object,
      isProcessing: _react.PropTypes.bool,
      isFailure: _react.PropTypes.bool,
      isSuccess: _react.PropTypes.bool,
      isComplete: _react.PropTypes.bool,
      createRequest: _react.PropTypes.func,
      dispatch: _react.PropTypes.func
    };


    var mapRequestStateToProps = function mapRequestStateToProps(state) {
      return {
        request: selectors.getRequestByName(state, routeName)
      };
    };

    var mapRequestDispatchToProps = function mapRequestDispatchToProps(dispatch) {
      return actions;
    };

    return (0, _reactRedux.connect)(mapRequestStateToProps, mapRequestDispatchToProps)(GatewayEvent);
  };
};
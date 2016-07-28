'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namespaceActions = namespaceActions;
exports.createReducer = createReducer;
exports.checkHttpStatus = checkHttpStatus;
function namespaceActions(namespace) {
  return function (items) {
    return items.reduce(function (acc, item) {
      acc[item] = [namespace, '/', item].join('');
      return acc;
    }, {});
  };
}

function createReducer(initialState, reducerMap) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    var reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
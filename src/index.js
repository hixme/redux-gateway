import * as actions from './actions'
import actionTypes from './actionTypes'
import * as constants from './constants'
import * as selectors from './selectors'
import reducer from './reducer'

export { setGateway } from './gateway'
export connectRequest from './connectRequest'

// selectors
export const getStats = selectors.getStats
export const getRecentErrors = selectors.getRecentErrors
export const isDebug = selectors.isDebug

export const getRequestByName = selectors.getRequestByName
export const getResponseByRequestName = selectors.getResponseByRequestName
export const getRouteByRequestName = selectors.getRouteByRequestName
export const getParamsByRequestName = selectors.getParamsByRequestName
export const getBodyByRequestName = selectors.getBodyByRequestName

// actions
export const createRequest = actions.createRequest
export const clearRequest = actions.clearRequest
export const retryRequestByName = actions.retryRequestByName

export default {
  actions,
  actionTypes,
  constants,
  selectors,
  reducer
}

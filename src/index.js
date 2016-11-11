import * as actions from './actions'
import actionTypes from './actionTypes'
import * as constants from './constants'
import * as selectors from './selectors'
import reducer from './reducer'

export { setGateway } from './gateway'
export connectRequest from './connectRequest'
export const getRequestByName = selectors.getRequestByName
export const getResponseByRequestName = selectors.getResponseByRequestName
export const createRequest = actions.createRequest
export const clearRequest = actions.clearRequest

export default {
  actions,
  actionTypes,
  constants,
  selectors,
  reducer
}

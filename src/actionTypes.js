import { namespaceActions } from 'modules/redux-utils'
import { NAME } from './constants'

export const SET_CLIENT = 'SET_CLIENT'
export const REQUEST_INIT = 'REQUEST_INIT'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE'

export default namespaceActions(NAME)([
  SET_CLIENT,
  REQUEST_INIT,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  REQUEST_COMPLETE
])

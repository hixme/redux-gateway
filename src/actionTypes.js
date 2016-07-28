import { namespaceActions } from './redux-utils'
import { NAME } from './constants'

export const REQUEST_INIT = 'REQUEST_INIT'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE'
export const REQUEST_CLEAR = 'REQUEST_CLEAR'

export default namespaceActions(NAME)([
  REQUEST_INIT,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  REQUEST_COMPLETE,
  REQUEST_CLEAR
])

import { NAME } from './constants.js'
import { createSelector } from 'reselect'
import { requestModel } from './request-reducer'

export const getAllRequests = createSelector(
  state => state[NAME],
  gateway => {
    // return empty object if reducer hasn't been initialized
    return gateway ? gateway.requests : {}
  }
)

export const getRequestByName = (state, routeName) => {
  return getAllRequests(state)[routeName] || requestModel
}

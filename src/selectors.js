import { NAME } from './constants.js'
import { createSelector } from 'reselect'
import { requestModel } from './request-reducer'

export const getAllRequests = createSelector(
  state => state[NAME],
  gateway => {
    return gateway.requests
  }
)

export const getRequestByName = (state, routeName) => {
  return getAllRequests(state)[routeName] || requestModel
}

import moment from 'moment'
import { createSelector } from 'reselect'
import { NAME } from './constants.js'
import { requestModel } from './request-reducer'

// PROD DEBUG
const REDUX_GATEWAY_LS_KEY = 'rgbugstat'
if (window.location.search.indexOf('hixbug') !== -1) {
  localStorage.setItem(REDUX_GATEWAY_LS_KEY, new Date())
}
const lsTimestamp = localStorage.getItem(REDUX_GATEWAY_LS_KEY)

// remove hixbug after 60 minutes
if (lsTimestamp && moment(null, 'MM/DD/YYYY').diff(lsTimestamp, 'seconds') > (60 * 60 * 1000)) {
  localStorage.removeItem(REDUX_GATEWAY_LS_KEY)
}

export const isDebug = () => !!localStorage.getItem(REDUX_GATEWAY_LS_KEY)

export const getStats = createSelector(
  state => state[NAME],
  (gateway) => {
    const {
      totalProcessing,
      totalSuccess,
      totalFailure,
      totalComplete
    } = gateway

    return {
      totalProcessing,
      totalSuccess,
      totalFailure,
      totalComplete
    }
  }
)

export const getAllRequests = createSelector(
  state => state[NAME],
  // return empty object if reducer hasn't been initialized
  gateway => (gateway ? gateway.requests : {})
)

export const getRecentRequests = createSelector(
  getAllRequests,
  requests => {
    const reqArray = Object.values(requests)
    const result = {
      processing: [],
      errors: []
    }

    return reqArray.reduce((prev, curr) => {
      const { isProcessing, isFailure, lastModified, type } = curr
      const diffSeconds = moment().diff(lastModified, 'seconds')

      if (type === 'GET' && diffSeconds < 10) {
        if (isFailure) {
          prev.errors.push(curr)
        }

        if (isProcessing) {
          prev.processing.push(curr)
        }
      }

      return prev
    }, result)
  }
)

export const getRecentErrors = createSelector(
  getAllRequests,
  requests => {
    const reqArray = Object.values(requests)
    return reqArray.length > 0
      ? reqArray.reduce((prev, curr) => {
        const { isFailure, lastModified } = curr
        const diffMinutes = moment().diff(lastModified, 'minutes')

        // if there is an error and the error is older than 10 minutes
        if (isFailure && diffMinutes < 5) {
          prev.push(curr)
        }

        return prev
      }, [])
      : []
  }
)

export const getRequestByName = (state, routeName) => getAllRequests(state)[routeName] || requestModel

export const getResponseByRequestName = (state, routeName) => getRequestByName(state, routeName).response

export const getRouteByRequestName = (state, routeName) => getRequestByName(state, routeName).route

export const getParamsByRequestName = (state, routeName) => getRequestByName(state, routeName).params

export const getBodyByRequestName = (state, routeName) => getRequestByName(state, routeName).body

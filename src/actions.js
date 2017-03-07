import t from './actionTypes'
import { gatewayRequest } from './gateway'
import { getRequestByName } from './selectors'

const MAX_RETRY_ATTEMPTS = 3

export const requestInit = (params) => {
  return {
    type: t.REQUEST_INIT,
    payload: params
  }
}

export const requestSuccess = (name, response) => ({
  type: t.REQUEST_SUCCESS,
  payload: {
    name,
    response
  }
})

export const requestFailure = (name, error) => ({
  type: t.REQUEST_FAILURE,
  payload: {
    name,
    error
  }
})

export const requestComplete = (name) => ({
  type: t.REQUEST_COMPLETE,
  payload: {
    name
  }
})

export const clearRequest = (name) => ({
  type: t.REQUEST_CLEAR,
  payload: {
    name
  }
})

export const createRequest = ({route, params, body, name, retry = false}) => {
  name = (name || route)
  return (dispatch, getState) => {
    const request = gatewayRequest(route, {params, body})
    dispatch(requestInit({name, route, params, body, request, retry}))

    request.then((data) => {
      dispatch(requestSuccess(name, data))
      dispatch(requestComplete(name))
    }, (error) => {
      // if there's an error, we should retry the request before completing or logging an error
      const requestModel = getRequestByName(getState(), name)
      if (requestModel.attempts < MAX_RETRY_ATTEMPTS) {
        dispatch(retryRequestByName(name))
      } else {
        dispatch(requestFailure(name, error))
        dispatch(requestComplete(name))
      }
    })

    return request
  }
}

export const retryRequestByName = (requestName) => {
  return (dispatch, getState) => {
    const requestModel = getRequestByName(getState(), requestName)

    // if the request is retried 3 times already, stop
    if (requestModel.attempts > MAX_RETRY_ATTEMPTS) return

    return dispatch(createRequest({...requestModel, retry: true}))
  }
}

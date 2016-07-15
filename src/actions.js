import t from './actionTypes'
import { gatewayRequest } from './gateway'

export const requestInit = (name) => {
  return {
    type: t.REQUEST_INIT,
    payload: {
      name
    }
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

export const createRequest = ({route, params, body, name}) => {
  name = (name || route)
  return (dispatch) => {
    dispatch(requestInit(name))
    return gatewayRequest(route, {params, body})
      .then((data) => {
        dispatch(requestSuccess(name, data))
        dispatch(requestComplete(name))
      }, (error) => {
        dispatch(requestFailure(name, error))
        dispatch(requestComplete(name))
      })
  }
}

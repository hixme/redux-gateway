import t from './actionTypes'

export const requestModel = {
  name: '',
  response: null,
  error: null,
  isProcessing: false,
  isFailure: false,
  isSuccess: false,
  isComplete: false,
  lastModified: null
}

const reducerMap = {
  [t.REQUEST_INIT]: (state, payload) => {
    return Object.assign({}, state, {
      name: payload.name,
      isProcessing: true,
      lastModified: new Date()
    })
  },
  [t.REQUEST_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      response: payload.response,
      isSuccess: true,
      isFailure: false,
      error: null,
      lastModified: new Date()
    })
  },
  [t.REQUEST_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      response: null,
      isSuccess: false,
      isFailure: true,
      error: payload.error,
      lastModified: new Date()
    })
  },
  [t.REQUEST_COMPLETE]: (state) => {
    return Object.assign({}, state, {
      isProcessing: false,
      isComplete: true,
      lastModified: new Date()
    })
  },
  [t.REQUEST_CLEAR]: (state) => {
    return requestModel
  }
}

export default (state = requestModel, action) => {
  const reducer = reducerMap[action.type]

  return reducer
      ? reducer(state, action.payload)
      : state
}

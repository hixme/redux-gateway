import t from './actionTypes'

export const requestModel = {
  id: 0, // incremented after each request
  name: '',
  displayName: '',

  type: null,
  route: null,
  params: null,
  body: null,
  request: null,

  response: null,
  error: null,

  isRefreshing: false,
  isProcessing: false,
  isFailure: false,
  isSuccess: false,
  isComplete: false,
  isRetrying: false,

  lastModified: null,
  attempts: 0
}

const reducerMap = {
  [t.REQUEST_INIT]: (state, payload) => {
    const {
      request,
      route = '',
      params,
      body,
      name,
      retry
    } = payload

    // Split camel cased route name to a readable name
    // example: clientEmployeesGet transforms to Client Employees Get
    const camelCaseName = route.replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => { return str.toUpperCase() })
    const names = camelCaseName.split(' ')
    const type = names.pop().toUpperCase()
    const displayName = names.join(' ')

    const isRefreshing = !!state.response

    return Object.assign({}, state, {
      id: ++state.id,
      name,
      displayName,
      type,
      route,

      params,
      body,

      request,
      error: null,

      isRefreshing,
      isProcessing: true,
      isSuccess: false,
      isFailure: false,
      isComplete: false,
      isRetrying: retry,

      attempts: (retry) ? ++state.attempts : 1,
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
      isRefreshing: false,
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

export function namespaceActions (namespace) {
  return (items) => {
    return items.reduce((acc, item) => {
      acc[item] = [namespace, '/', item].join('')
      return acc
    }, {})
  }
}

export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]

    return reducer
        ? reducer(state, action.payload)
        : state
  }
}

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

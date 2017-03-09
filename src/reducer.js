import { createReducer } from './redux-utils'
import t from './actionTypes'
import reqReducer from './request-reducer'

const initialState = {
  client: null,
  requests: {},
  totalProcessing: 0,
  totalComplete: 0,
  totalFailure: 0,
  totalSuccess: 0
}

export default createReducer(initialState, {
  [t.REQUEST_INIT]: (state, payload) => {
    // if the request is processing, we need to decrement it
    let totalProcessing = state.totalProcessing
    // const { isProcessing } = state.requests[payload.name] || {}
    // if (isProcessing) {
    //   --totalProcessing
    // }

    var request = reqReducer(state.requests[payload.name], {type: t.REQUEST_INIT, payload})

    var requests = Object.assign({}, state.requests, {
      [payload.name]: request
    })

    ++totalProcessing
    return Object.assign({}, state, {
      // prevent totalProcessing from becoming less than zero
      totalProcessing: (totalProcessing < 1) ? 1 : totalProcessing,
      requests
    })
  },
  [t.REQUEST_SUCCESS]: (state, payload) => {
    var request = reqReducer(state.requests[payload.name], {type: t.REQUEST_SUCCESS, payload})

    const requests = Object.assign({}, state.requests, {
      [payload.name]: request
    })

    return Object.assign({}, state, {
      totalSuccess: (state.totalSuccess + 1),
      requests
    })
  },
  [t.REQUEST_FAILURE]: (state, payload) => {
    var request = reqReducer(state.requests[payload.name], {type: t.REQUEST_FAILURE, payload})

    var requests = Object.assign({}, state.requests, {
      [payload.name]: request
    })

    return Object.assign({}, state, {
      totalFailure: (state.totalFailure + 1),
      requests
    })
  },
  [t.REQUEST_COMPLETE]: (state, payload) => {
    var request = reqReducer(state.requests[payload.name], {type: t.REQUEST_COMPLETE})

    var requests = Object.assign({}, state.requests, {
      [payload.name]: request
    })

    return Object.assign({}, state, {
      totalProcessing: (state.totalProcessing - 1),
      totalComplete: (state.totalComplete + 1),
      requests
    })
  },
  [t.REQUEST_CLEAR]: (state, payload) => {
    // if the request is processing, we need to decrement it
    // const { isProcessing } = state.requests[payload.name] || {}
    // const totalProcessing = (isProcessing) ? --state.totalProcessing : state.totalProcessing

    var request = reqReducer(state.requests[payload.name], {type: t.REQUEST_CLEAR})

    var requests = Object.assign({}, state.requests, {
      [payload.name]: request
    })

    return Object.assign({}, state, {
      requests
      // totalProcessing
    })
  }
})

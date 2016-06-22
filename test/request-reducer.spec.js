import reduxGateway from 'modules/redux-gateway'
import reducer from 'modules/redux-gateway/request-reducer'
const {
  actions,
  actionTypes,
  selectors
} = reduxGateway

const TEST_ROUTE = 'testRoute'
const REQUEST_PAYLOAD = [{
  "IssuerName": "Plan 1",
  "PlanType": "HMO",
  "PlanPremium": 135
}, {
  "IssuerName": "Plan 2",
  "PlanType": "HMO",
  "PlanPremium": 170
}, {
  "IssuerName": "Plan 3",
  "PlanType": "PPO",
  "PlanPremium": 161
}]
const REQUEST_ERROR = {
  status: 403,
  statusText: 'Error: Model submission failed'
}

describe('(Redux Module) Request Reducer', function () {
  describe('(Reducer)', function() {
    it('Should be exported as a function.', function () {
      expect(reducer).to.be.a('function')
    })
  })

  describe('(Model) initialState', function() {
    let state = reducer(undefined, {})

    it('Should hold initial state.', function () {
      expect(state.name).to.be.empty
      expect(state.response).to.be.null
      expect(state.error).to.be.null
      expect(state.isProcessing).to.be.false
      expect(state.isSuccess).to.be.false
      expect(state.isFailure).to.be.false
      expect(state.isComplete).to.be.false
    })
  })

  describe('(Action) requestInit', function() {
    let state = reducer(undefined, {})
    state = reducer(state, actions.requestInit(TEST_ROUTE))
    it(`Should change state name from empty to ${TEST_ROUTE}.`, function () {
      expect(state.name).to.equal(TEST_ROUTE)
    })

    it('Should change state isProcessing from false to true.', function () {
      expect(state.isProcessing).to.be.true
    })

    it('Should keep state properties response, error, isSuccess, isFailure, isComplete.', function () {
      expect(state.response).to.be.null
      expect(state.error).to.be.null
      expect(state.isSuccess).to.be.false
      expect(state.isFailure).to.be.false
      expect(state.isComplete).to.be.false
    })
  })

  describe('(Action) requestInit', function() {
    let state = reducer(undefined, {})
    state = reducer(state, actions.requestInit(TEST_ROUTE))

    it(`Should change state name from empty to ${TEST_ROUTE}.`, function () {
      expect(state.name).to.equal(TEST_ROUTE)
    })

    it('Should change state isProcessing from false to true.', function () {
      expect(state.isProcessing).to.be.true
    })

    it('Should keep state properties response, error, isSuccess, isFailure, isComplete.', function () {
      expect(state.response).to.be.null
      expect(state.error).to.be.null
      expect(state.isSuccess).to.be.false
      expect(state.isFailure).to.be.false
      expect(state.isComplete).to.be.false
    })
  })

  describe('(Action) requestSuccess', function() {
    let state = reducer(undefined, {})
    state = reducer(state, actions.requestSuccess(TEST_ROUTE, REQUEST_PAYLOAD))

    it('Should change state isSuccess from false to true.', function () {
      expect(state.isSuccess).to.be.true
    })

    it('Should change state response from null to an array.', function () {
      expect(state.response).to.equal(REQUEST_PAYLOAD)
    })

    it('Should keep state - error, isProcessing, isFailure, isComplete.', function () {
      expect(state.error).to.be.null
      expect(state.isProcessing).to.be.false
      expect(state.isFailure).to.be.false
      expect(state.isComplete).to.be.false
    })
  })

  describe('(Action) requestFailure', function() {
    let state = reducer(undefined, {})
    state = reducer(state, actions.requestFailure(TEST_ROUTE, REQUEST_ERROR))

    it('Should change state isFailure from false to true.', function () {
      expect(state.isFailure).to.be.true
    })

    it('Should change state response from null to an array.', function () {
      expect(state.error).to.have.property('statusText', REQUEST_ERROR.statusText)
    })

    it('Should keep state - response, isProcessing, isSuccess, isComplete.', function () {
      expect(state.response).to.be.null
      expect(state.isProcessing).to.be.false
      expect(state.isSuccess).to.be.false
      expect(state.isComplete).to.be.false
    })
  })

  describe('(Action) requestComplete', function() {
    let state = reducer(undefined, {})
    state = reducer(state, actions.requestComplete(TEST_ROUTE))

    it('Should change state isComplete from false to true.', function () {
      expect(state.isComplete).to.be.true
    })

    it('Should keep state - error, isProcessing, isSuccess, isFailure.', function () {
      expect(state.response).to.be.null
      expect(state.isProcessing).to.be.false
      expect(state.isSuccess).to.be.false
      expect(state.isFailure).to.be.false
    })
  })

})

import reduxGateway from 'modules/redux-gateway'
const {
  actions,
  actionTypes,
  constants,
  reducer,
  selectors
} = reduxGateway

const TEST_REDUCER_NAME = 'reduxGateway'
const ACTION_TYPE_PREFIX = TEST_REDUCER_NAME + '/'
const TEST_ROUTE = 'testRoute'
const SEARCH_REQUEST_PAYLOAD = [{
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
const SEARCH_REQUEST_ERROR = {
  status: 403,
  statusText: 'Error: Model submission failed'
}

describe('(Redux Module) Redux Gateway', function () {
  describe('(Reducer)', function() {
    it('Should be exported as a function.', function () {
      expect(reducer).to.be.a('function')
    })
  })

  describe('(Constants)', function() {
    it(`Should export a constant NAME to equal ${TEST_REDUCER_NAME}`, function () {
      expect(constants.NAME).to.equal(TEST_REDUCER_NAME)
    })

    it('Should export a constant REQUEST_INIT', function () {
      expect(constants.REQUEST_INIT).to.equal('REQUEST_INIT')
    })

    it('Should export a constant REQUEST_SUCCESS', function () {
      expect(constants.REQUEST_SUCCESS).to.equal('REQUEST_SUCCESS')
    })

    it('Should export a constant REQUEST_FAILURE', function () {
      expect(constants.REQUEST_FAILURE).to.equal('REQUEST_FAILURE')
    })

    it('Should export a constant REQUEST_COMPLETE', function () {
      expect(constants.REQUEST_COMPLETE).to.equal('REQUEST_COMPLETE')
    })
  })

  describe('(ActionTypes)', function() {
    it('Should export a actionType REQUEST_INIT', function () {
      expect(actionTypes.REQUEST_INIT)
        .to.equal(ACTION_TYPE_PREFIX + constants.REQUEST_INIT)
    })

    it('Should export a actionType REQUEST_SUCCESS', function () {
      expect(actionTypes.REQUEST_SUCCESS)
        .to.equal(ACTION_TYPE_PREFIX + constants.REQUEST_SUCCESS)
    })

    it('Should export a actionType REQUEST_FAILURE', function () {
      expect(actionTypes.REQUEST_FAILURE)
        .to.equal(ACTION_TYPE_PREFIX + constants.REQUEST_FAILURE)
    })

    it('Should export a actionType REQUEST_COMPLETE', function () {
      expect(actionTypes.REQUEST_COMPLETE)
        .to.equal(ACTION_TYPE_PREFIX + constants.REQUEST_COMPLETE)
    })
  })

  describe('(Actions) request lifecycle', function() {

    describe('(Action) createRequest', function() {
      it('Should be exported as a function.', function () {
        expect(actions.createRequest).to.be.a('function')
      })
    })

    let state = reducer(undefined, {})
    describe('(Action) initialState', function() {
      it('Should hold initial state.', function () {
        expect(state.client).to.equal(null)
        // expect(state.requests).to.equal({})
        expect(state.totalProcessing).to.equal(0)
        expect(state.totalSuccess).to.equal(0)
        expect(state.totalFailure).to.equal(0)
        expect(state.totalComplete).to.equal(0)
      })
    })

    describe('(Action) requestInit', function() {
      it('Should be exported as a function.', function () {
        expect(actions.requestInit).to.be.a('function')
      })

      it(`Should return an action with a namespaced type of "${ACTION_TYPE_PREFIX}REQUEST_INIT".`, function () {
        expect(actions.requestInit()).to.have.property('type', actionTypes.REQUEST_INIT)
      })

      it('Should change state property totalProcessing from 0 to 1.', function () {
        state = reducer(state, actions.requestInit(TEST_ROUTE))
        expect(state.totalProcessing).to.equal(1)
        expect(state.totalSuccess).to.equal(0)
        expect(state.totalFailure).to.equal(0)
        expect(state.totalComplete).to.equal(0)
      })
    })

    describe('(Action) requestSuccess', function() {
      it('Should be exported as a function.', function () {
        expect(actions.requestSuccess).to.be.a('function')
      })

      it(`Should return an action with a namespaced type of "${ACTION_TYPE_PREFIX}REQUEST_SUCCESS".`, function () {
        expect(actions.requestSuccess()).to.have.property('type', actionTypes.REQUEST_SUCCESS)
      })

      it('Should change state property totalSuccess from 0 to 1.', function () {
        state = reducer(state, actions.requestSuccess(TEST_ROUTE, []))
        expect(state.totalProcessing).to.equal(1)
        expect(state.totalSuccess).to.equal(1)
        expect(state.totalFailure).to.equal(0)
        expect(state.totalComplete).to.equal(0)
      })
    })

    describe('(Action) requestFailure', function() {
      it('Should be exported as a function.', function () {
        expect(actions.requestFailure).to.be.a('function')
      })

      it(`Should return an action with a namespaced type of "${ACTION_TYPE_PREFIX}REQUEST_FAILURE".`, function () {
        expect(actions.requestFailure()).to.have.property('type', actionTypes.REQUEST_FAILURE)
      })

      it('Should change state property totalFailure from 0 to 1', function () {
        state = reducer(state, actions.requestFailure(TEST_ROUTE, {}))
        expect(state.totalProcessing).to.equal(1)
        expect(state.totalSuccess).to.equal(1)
        expect(state.totalFailure).to.equal(1)
        expect(state.totalComplete).to.equal(0)
      })
    })

    describe('(Action) requestComplete', function() {
      it('Should be exported as a function.', function () {
        expect(actions.requestComplete).to.be.a('function')
      })

      it(`Should return an action with a namespaced type of "${ACTION_TYPE_PREFIX}REQUEST_COMPLETE".`, function () {
        expect(actions.requestComplete()).to.have.property('type', actionTypes.REQUEST_COMPLETE)
      })

      it('Should change state property totalComplete from 0 to 1. totalProcessing from 1 to 0', function () {
        state = reducer(state, actions.requestComplete(TEST_ROUTE))
        expect(state.totalProcessing).to.equal(0)
        expect(state.totalSuccess).to.equal(1)
        expect(state.totalFailure).to.equal(1)
        expect(state.totalComplete).to.equal(1)
      })
    })
  })
})

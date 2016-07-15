import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as selectors from './selectors'
import * as actions from './actions'

export default (params) => {
  const routeName = params.name || params.route
  if (!routeName) {
    console.error('connectRequest: route is a required parameter')
  }

  return (View) => {
    class GatewayEvent extends Component {
      static propTypes = {
        request: PropTypes.object,
        isProcessing: PropTypes.bool,
        isFailure: PropTypes.bool,
        isSuccess: PropTypes.bool,
        isComplete: PropTypes.bool,
        createRequest: PropTypes.func,
        dispatch: PropTypes.func
      };

      componentWillMount () {
        const {
          requestOnMount,
          requestOnMountParams,
          requestOnMountBody
        } = params

        // make a request on mount if needed
        if (requestOnMount || requestOnMountParams || requestOnMountBody) {
          const {
            route,
            name
          } = params

          const requestParams = {
            route,
            name,
            params: requestOnMountParams,
            body: requestOnMountBody
          }

          this.props.dispatch(this.props.createRequest(requestParams))
        }
        this.checkEvents()
      }

      componentWillReceiveProps (nextProps) {
        this.checkEvents(nextProps)
      }

      checkEvents (props) {
        if (!props) return

        const prevPropRequest = this.props.request
        const { request } = props
        const {
          isProcessing,
          isSuccess,
          isFailure,
          isComplete } = request

        if (isFailure && isFailure !== prevPropRequest.isFailure && params.onFailure) {
          params.onFailure(request, this.props.dispatch)
        }

        if (isProcessing && isProcessing !== prevPropRequest.isProcessing && params.onProcessing) {
          params.onProcessing(request, this.props.dispatch)
        }

        if (isSuccess && isSuccess !== prevPropRequest.isSuccess && params.onSuccess) {
          params.onSuccess(request, this.props.dispatch)
        }

        if (isComplete && isComplete !== prevPropRequest.isComplete && params.onComplete) {
          params.onComplete(request, this.props.dispatch)
        }
      }

      render () {
        return (<View {...this.props} />)
      }
    }

    const mapRequestStateToProps = (state) => {
      return {
        request: selectors.getRequestByName(state, routeName)
      }
    }

    const mapRequestDispatchToProps = (dispatch) => {
      return {dispatch, ...actions}
    }

    return connect(mapRequestStateToProps, mapRequestDispatchToProps)(GatewayEvent)
  }
}

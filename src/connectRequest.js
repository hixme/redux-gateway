import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as selectors from './selectors'
import * as actions from './actions'

export default (params) => {
  const routeName = params.name || params.route
  const ProcessingView = params.processingView
  const FailureView = params.failureView

  if (!routeName) {
    console.error('connectRequest: route is a required parameter')
  }

  return (View) => {
    // get configuration for state and dispatch props
    const { mapStateToProps, mapDispatchToProps } = params

    const mapViewStateToProps = (state, ownProps) => {
      const request = selectors.getRequestByName(state, routeName)

      // allow the user to configure the state and request props
      if (mapStateToProps) {
        return {
          ...mapStateToProps(state, ownProps, request),
          request
        }
      }

      // default - map request to the view
      return {
        request
      }
    }

    let mapViewDispatchToProps = (mapDispatchToProps || actions)

    const ConnectedView = connect(mapViewStateToProps, mapViewDispatchToProps)(View)

    class GatewayEvent extends Component {
      static propTypes = {
        request: PropTypes.object,
        isProcessing: PropTypes.bool,
        isFailure: PropTypes.bool,
        isSuccess: PropTypes.bool,
        isComplete: PropTypes.bool,
        createRequest: PropTypes.func,
        clearRequest: PropTypes.func,
        dispatch: PropTypes.func
      };

      componentWillMount () {
        const {
          requestOnMount,
          requestOnMountParams,
          requestOnMountBody
        } = params

        if (params.onMount) {
          params.onMount(this.props, this.props.dispatch)
        }

        if (params.clearOnMount) {
          this.props.dispatch(this.props.clearRequest(routeName))
        }

        // make a request on mount if needed
        if (requestOnMount || requestOnMountParams || requestOnMountBody) {
          const {
            route,
            name
          } = params

          const requestParams = {
            route,
            name,
            params: requestOnMountParams ? requestOnMountParams(this.props) : null,
            body: requestOnMountBody ? requestOnMountBody(this.props) : null
          }

          this.props.dispatch(this.props.createRequest(requestParams))
        }
        this.checkEvents()
      }

      componentWillUnmount () {
        if (params.onUnmount) {
          params.onUnmount(this.props, this.props.dispatch)
        }

        if (params.clearOnUnmount) {
          this.props.dispatch(this.props.clearRequest(routeName))
        }
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
        if (this.props.request.isProcessing && ProcessingView) {
          return (<ProcessingView {...this.props} />)
        }

        if (this.props.request.isFailure && FailureView) {
          return (<FailureView {...this.props} />)
        }

        return (
          <ConnectedView {...this.props} />
        )
      }
    }

    const mapRequestStateToProps = (state) => {
      return {
        request: selectors.getRequestByName(state, routeName)
      }
    }

    const mapRequestDispatchToProps = (dispatch) => ({...actions, dispatch})

    return connect(mapRequestStateToProps, mapRequestDispatchToProps)(GatewayEvent)
  }
}

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import isFunction from 'lodash/isFunction'
import * as selectors from './selectors'
import * as actions from './actions'

export default (params) => {
  const ProcessingView = params.processingView
  const FailureView = params.failureView

  return (View) => {
    // get configuration for state and dispatch props
    const { mapStateToProps, mapDispatchToProps } = params

    const mapViewStateToProps = (state, ownProps) => {
      const { routeName } = ownProps

      if (!routeName) {
        console.error('connectRequest: route is a required parameter')
      }

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

    const mapViewDispatchToProps = (mapDispatchToProps || actions)
    const ConnectedView = connect(mapViewStateToProps, mapViewDispatchToProps)(View)

    class GatewayEvent extends Component {
      static propTypes = {
        request: PropTypes.object,
        isProcessing: PropTypes.bool,
        isFailure: PropTypes.bool,
        isSuccess: PropTypes.bool,
        isRefreshing: PropTypes.bool,
        isRetrying: PropTypes.bool,
        isComplete: PropTypes.bool,
        createRequest: PropTypes.func,
        clearRequest: PropTypes.func,
        dispatch: PropTypes.func,
        routeName: PropTypes.string
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
          this.props.dispatch(this.props.clearRequest(this.props.routeName))
        }

        // make a request on mount if needed
        if (requestOnMount || requestOnMountParams || requestOnMountBody) {
          this.initRequest(this.props)
        }
        this.checkEvents()
      }

      componentWillUnmount () {
        if (params.onUnmount) {
          params.onUnmount(this.props, this.props.dispatch)
        }

        if (params.clearOnUnmount) {
          this.props.dispatch(this.props.clearRequest(this.props.routeName))
        }
      }

      componentWillReceiveProps (nextProps) {
        this.checkEvents(nextProps)

        // recall the request if requestOnPropsChange allows
        if (params.requestOnPropsChange && params.requestOnPropsChange(this.props, nextProps)) {
          this.initRequest(nextProps)
        }
      }

      initRequest (props) {
        const {
          requestOnMountParams,
          requestOnMountBody,
          route
        } = params

        const { routeName } = props

        const requestParams = {
          route,
          name: routeName,
          params: requestOnMountParams ? requestOnMountParams(props) : null,
          body: requestOnMountBody ? requestOnMountBody(props) : null
        }

        this.props.dispatch(this.props.createRequest(requestParams))
      }

      checkEvents (props) {
        if (!props) return

        const prevPropRequest = this.props.request
        const { request } = props
        const {
          isProcessing,
          isSuccess,
          isFailure,
          isComplete,
          isRefreshing,
          isRetrying } = request

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

        if (isRefreshing && isRefreshing !== prevPropRequest.isRefreshing && params.onRefresh) {
          params.onRefresh(request, this.props.dispatch)
        }

        if (isRetrying && isRetrying !== prevPropRequest.isRetrying && params.onRetry) {
          params.onRetry(request, this.props.dispatch)
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

    const mapRequestStateToProps = (state, ownProps) => {
      const routeName = params.name &&
        isFunction(params.name) ? params.name(state, ownProps) : params.name || params.route
      return {
        routeName,
        request: selectors.getRequestByName(state, routeName)
      }
    }

    const mapRequestDispatchToProps = (dispatch) => ({ ...actions, dispatch })

    return connect(mapRequestStateToProps, mapRequestDispatchToProps)(GatewayEvent)
  }
}

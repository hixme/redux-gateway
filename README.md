# redux-gateway

API gateway request lifecycle management with redux

`import gateway from 'redux-gateway'`

This gives you access to the reducer, constants, actions, and selectors available

`import { connectRequest } from 'redux-gateway'`

connectRequest is a higher-order-component that connects the request object to another component.  You can listen in on request events and dispatch other actions.

```javascript
import { connectRequest } from 'redux-gateway'
import MyComponent from 'path/to/MyComponent'
import notification from 'path/to/notification'

const SearchRequestForm = connectRequest({
  route: constants.SEARCH_PLANS_ROUTE,
  requestOnMount: true,
  onProcessing: (request, dispatch) => {
    dispatch(notification({message: 'In progress'}))
  }
})(MyComponent)

```

## Examples

#### Create request / dispatch request
```javascript
import gateway, { createRequest } from 'redux-gateway'

// create request
gateway.actions.createRequest({route: 'apiGatewayRoute'})
createRequest({route: 'apiGatewayRoute'})

// create GET request with params
gateway.actions.createRequest({route: 'apiGatewayRoute', params: {name: 'value'}})
createRequest({route: 'apiGatewayRoute', params: {name: 'value'}})

// create POST request with body
gateway.actions.createRequest({route: 'apiGatewayRoute', body: {name: 'value'}})
createRequest({route: 'apiGatewayRoute', body: {name: 'value'}})

// with dispatch
dispatch(gateway.actions.createRequest({route: 'apiGatewayRoute'}))
dispatch(createRequest({route: 'apiGatewayRoute'}))

```

#### Get request selector
To use and transform the data from the request, use the `getRequestByName` by name selector
```javascript
import gateway, { getRequestByName }

// usage
gateway.selectors.getRequestByName(state, 'requestRouteName')
getRequestByName(state, 'requestRouteName')

// With connect from react-redux, you can map the request properties
import { connect } from 'react-redux'
import MyComponent from '/path/to/component'
connect((state) => {
  const req = getRequestByName(state, 'requestRouteName')
  return {
    list: req.response,
    submitting: req.isProcessing
  }
})(MyComponent)

```

### Send request when component mounts

Often times you'll want to get data when the component mounts. Using `requestOnMount` will fire off the API request on the `componentWillMount` event.
```javascript
import { connectRequest } from 'redux-gateway'
import MyComponent from 'path/to/MyComponent'

const SearchRequestForm = connectRequest({
  route: 'searchPlansRoute',
  requestOnMount: true,
})(MyComponent)

```

#### On mount request with params

For GET requests that require parameters when triggered on mount, use `requestOnMountParams`

```javascript
import { connectRequest } from 'redux-gateway'
import MyComponent from 'path/to/MyComponent'

const SearchRequestForm = connectRequest({
  route: 'searchPlansRoute',
  requestOnMountParams: (props) => ({name: 'First', last: 'Last'}),
})(MyComponent)

```

#### On mount request with body

For POST requests that require parameters when triggered on mount, use `requestOnMountBody`

```javascript
import { connectRequest } from 'redux-gateway'
import MyComponent from 'path/to/MyComponent'

const SearchRequestForm = connectRequest({
  route: 'searchPlansRoute',
  requestOnMountBody: (props) => ({name: 'First', last: 'Last'}),
})(MyComponent)

```

#### mapStateToProps / mapDispatchToProps

You can map state and dispatch to props, and transform the request object as needed.

```javascript
import { connectRequest } from 'redux-gateway'
import MyComponent from 'path/to/MyComponent'

const SearchRequestForm = connectRequest({
  route: 'searchPlansRoute',
  requestOnMountParams: (props) => ({name: 'First', last: 'Last'}),
  mapStateToProps: (state, request) => {
    return {
      plans: request.response,
    }
  }
})(MyComponent)

```


### Listen for request events

connectReqest has an interface to listen to events, when the request is processing, is successful, has a failure, or becomes complete. You have access to the request object itself, and dispatch for firing other redux actions
```javascript
import { connectRequest } from 'redux-gateway'
import MyComponent from 'path/to/MyComponent'

const SearchRequestForm = connectRequest({
  onProcessing: (request, dispatch) => {
    console.log('onProcessing - ', request)
  },
  onSuccess: (request, dispatch) => {
    console.log('onSuccess - ', request)
  },
  onComplete: (request, dispatch) => {
    console.log('onComplete - ', request)
  },
  onFailure: (request, dispatch) => {
    console.log('onFailure - ', request.error)
})(MyComponent)

```

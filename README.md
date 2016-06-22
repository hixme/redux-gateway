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
import gateway from 'redux-gateway'

// create request
gateway.actions.createRequest({route: 'apiGatewayRoute'})

// create GET request with params
gateway.actions.createRequest({route: 'apiGatewayRoute', params: {name: 'value'}})

// create POST request with body
gateway.actions.createRequest({route: 'apiGatewayRoute', body: {name: 'value'}})

// with dispatch
dispatch(gateway.actions.createRequest({route: 'apiGatewayRoute'}))

```

### Send request when component mounts

Often times you'll want to get data when the component mounts. Using `requestOnMount` will fire off the API request on the `componentWillMount` event.
```javascript
import { connectRequest } from 'redux-gateway'
import MyComponent from 'path/to/MyComponent'

const SearchRequestForm = connectRequest({
  route: constants.SEARCH_PLANS_ROUTE,
  requestOnMount: true,
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

# redux-gateway

API gateway request lifecycle management with redux

`import gateway from 'redux-gateway'`

This gives you access to the reducer, constants, actions, and selectors available

`import { connectRequest } from 'redux-gateway'`

connectRequest is a higher-order-component that connects the request object to another component

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

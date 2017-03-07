// singleton gateway interface
export let gateway = null

// set client config
export const setGateway = (apigClient) => {
  gateway = apigClient
}

const createError = (message) => {
  let status = 500

  if (message === 'Process exited before completing request') {
    message = 'An unknown error occurred'
    status = 520
  }

  const e = {
    status: status,
    statusText: message,
    message
  }

  console.error('API error: ' + JSON.stringify(e))

  return e
}

export const gatewayRequest = (route, { params, body, additionalParams } = { }) => new Promise((resolve, reject) => {
  if (!gateway[route]) {
    reject(createError({
      status: 999,
      message: `redux-gateway: ${route} not available. Is this endpoint available in your environment?`
    }))
  } else {
    gateway[route](params, body, additionalParams)
      .then((response) => {
        const { data } = response

        // if data is null - throw error :: data should not be null
        // else if data.errorMessage is present - throw error
        // else resolve
        if (data === null) {
          reject(createError('Bad response from server. API should not return null'))
        } else if (data.errorMessage) {
          reject(createError(data.errorMessage))
        } else {
          resolve(data)
        }
      }, (error) => {
        reject(createError(error))
      })
  }
})

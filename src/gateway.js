// singleton gateway interface
export let gateway = null

// set client config
export const setGateway = (apigClient) => {
  gateway = apigClient
}

const createError = (message) => {
  let status = 400

  if (message === 'Process exited before completing request') {
    message = 'An unknown error occurred'
    status = 520
  }

  const e = {
    status: status,
    statusText: message,
    message
  }

  return e
}

export const gatewayRequest = (route, {params, body, additionalParams} = { }) => {
  return new Promise((resolve, reject) => {
    gateway[route](params, body, additionalParams)
      .then((response) => {
        const data = response.data
        if (data.errorMessage) {
          reject(createError(data.errorMessage))
        } else {
          resolve(data)
        }
      }, (error) => {
        reject(createError(error))
      })
  })
}

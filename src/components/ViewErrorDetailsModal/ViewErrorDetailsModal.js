import React from 'react'
import uuid from 'uuid/v1'

import Container from 'hixme-ui/lib/Container'
import Title from 'hixme-ui/lib/Title'

// TODO: we need a global module for modals. Possibly from hixme-ui
import Modal from 'modules/modal'

@Modal.containers.Modal({
  content: {
    position: 'top',
    size: 'medium',
    styles: {
      width: '100%',
      margin: '50px 0 0 0'
    }
  },
  overlay: {
    hideCloseButton: false,
    routeOnHide: false,
    dark: false
  }
})
class ViewErrorDetailsModal extends React.Component {
  render () {
    const {
      errors
    } = this.props

    const cellStyle = {
      padding: '5px 10px'
    }

    const getValue = (value) => {
      if (value === undefined) return 'undefined'
      if (value === null) return 'null'
      if (value === 0) return '0'
      if ((`${value}`).length === 0) return 'Empty string'

      return value
    }

    const parseObject = (obj) => {
      obj = obj || {}
      return Object.keys(obj).map((key) => (
        <Container noPadding marginBottom='3px' key={uuid()}>
          {key}: {getValue(obj[key])}
        </Container>
      ))
    }

    return (
      <Container>
        <Title red>API Errors</Title>
        <table>
          <thead>
            <tr>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Route</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Params</th>
              <th style={cellStyle}>Body</th>
              <th style={cellStyle}>Message</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((req) => {
              const { type, route, displayName, error, params, body } = req
              return (
                <tr key={error.route}>
                  <td style={cellStyle}>{type}</td>
                  <td style={cellStyle}>{route}</td>
                  <td style={cellStyle}>{displayName}</td>
                  <td style={cellStyle}>{error.status}</td>
                  <td style={cellStyle}>{parseObject(params)}</td>
                  <td style={cellStyle}>{parseObject(body)}</td>
                  <td style={cellStyle}>{error.message}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Container>
    )
  }
}

ViewErrorDetailsModal.displayName = 'ViewErrorDetailsModal'
ViewErrorDetailsModal.propTypes = {
  errors: React.PropTypes.array.isRequired
}

export default ViewErrorDetailsModal

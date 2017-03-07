import React from 'react'
import Container from 'hixme-ui/lib/Container'

const RequestBox = ({
  processing,
  errors
}) => (
  <Container
    noPadding
    style={{
      position: 'absolute',
      top: 57,
      left: 0,
      color: 'white',
      fontSize: 11
    }}
  >
    {processing.length > 0 &&
      <Container blue padding='4px' style={{ display: 'inline-block' }}>
        ...
      </Container>
    }
    {processing.length === 0 && errors.length > 0 &&
      <Container red padding='4px' style={{ display: 'inline-block' }}>
        *error loading
      </Container>
    }
  </Container>
)


RequestBox.displayName = 'RequestBox'
RequestBox.propTypes = {
  processing: React.PropTypes.array.isRequired,
  errors: React.PropTypes.array.isRequired
}

export default RequestBox

import React from 'react'

import Container from 'hixme-ui/lib/Container'
import Text from 'hixme-ui/lib/Text'

const SystemReport = ({
  isDebug,
  totalProcessing,
  totalSuccess,
  totalFailure,
  totalComplete,
  viewErrorDetails
}) => {
  if (!isDebug) return (<div />)

  // Show API Error list when command + option + v is pressed
  window.addEventListener('keydown', (event) => {
    const {
      altKey,
      metaKey,
      keyCode
    } = event

    if (altKey && metaKey && keyCode === 86) {
      viewErrorDetails()
    }
  })

  return (
    <Container
      noPadding
      style={{
        position: 'fixed',
        bottom: 10,
        left: 10,
        zIndex: '10000000000000',
        color: 'white'
      }}
    >
      <div style={{ width: '130px' }}>
        {totalProcessing > 0 &&
          <Container purple rounded marginBottom='3px' padding='10px'>
            ({totalProcessing}) Processing...
          </Container>
        }

        <Container green rounded marginBottom='3px' padding='10px'>
          ({totalSuccess}) Success
        </Container>

        <Text onClick={viewErrorDetails} cursor='pointer'>
          <Container red rounded marginBottom='3px' padding='10px'>
            ({totalFailure}) Failure
          </Container>
        </Text>

        <Container blue rounded marginBottom='3px' padding='10px'>
          ({totalComplete}) Complete
        </Container>
      </div>
    </Container>
  )
}

SystemReport.displayName = 'SystemReport'
SystemReport.propTypes = {
  isDebug: React.PropTypes.bool.isRequired,
  totalProcessing: React.PropTypes.number.isRequired,
  totalSuccess: React.PropTypes.number.isRequired,
  totalFailure: React.PropTypes.number.isRequired,
  totalComplete: React.PropTypes.number.isRequired,
  viewErrorDetails: React.PropTypes.func.isRequired
}

export default SystemReport

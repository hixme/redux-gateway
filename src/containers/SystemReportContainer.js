import { connect } from 'react-redux'
import modal from 'modules/modal'

import SystemReport from '../components/SystemReport'
import ViewErrorDetailsContainer from './ViewErrorDetailsContainer'
import { getStats, getRecentErrors, isDebug } from '../selectors'

export default connect((state) => {
  const {
    totalProcessing,
    totalComplete,
    totalFailure,
    totalSuccess
  } = getStats(state)

  const errors = getRecentErrors(state)

  return {
    isDebug: isDebug(),
    errors,
    totalProcessing,
    totalComplete,
    totalFailure,
    totalSuccess
  }
}, (dispatch) => ({
  viewErrorDetails: () => {
    dispatch(modal.actions.setViewAndShowModal(ViewErrorDetailsContainer))
  }
}))(SystemReport)

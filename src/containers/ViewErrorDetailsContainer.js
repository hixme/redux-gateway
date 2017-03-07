import { connect } from 'react-redux'
import { getStats, getRecentErrors } from '../selectors'
import { ViewErrorDetailsModal } from '../components'

export default connect((state) => {
  return {
    totalFailure: getStats(state).totalFailure,
    errors: getRecentErrors(state)
  }
})(ViewErrorDetailsModal)

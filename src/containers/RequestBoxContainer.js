import { connect } from 'react-redux'

import { RequestBox } from '../components'
import { getRecentRequests } from '../selectors'

export default connect((state) => getRecentRequests(state))(RequestBox)

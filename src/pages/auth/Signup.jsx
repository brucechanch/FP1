import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  authSignup
} from '@/actions/auth'

import FormsAuthSignup from '@/forms/auth/Signup'

class PagesAuthSignup extends React.Component {
  constructor(props) {
    super(props)

    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
  }

  handleSignupSubmit(values, formik) {
    this.props.authSignup(values).then(() => {
      const { history: { push } } = this.props
      push('/auth/login')
    }).finally(() => {
      formik.setSubmitting(false)
    })
  }

  render() {
    return (
      <div id="pages-auth-signup" className="container text-center my-3">
        <h1 className="mb-3">Signup</h1>

        <div className="row text-left">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <FormsAuthSignup onSubmit={this.handleSignupSubmit} />
          </div>
        </div>
      </div>
    )
  }
}

PagesAuthSignup.propTypes = {
  history: PropTypes.shape().isRequired,
  authSignup: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  authSignup
}

export default connect(null, mapDispatchToProps)(PagesAuthSignup)

import React from 'react'
import PropTypes from 'prop-types'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import LayoutsNavbar from '@/layouts/Navbar'
import PrivateRoute from '@/components/PrivateRoute'
import AuthRoute from '@/components/AuthRoute'
import Loading from '@/components/Loading'

import PagesServices from '@/pages/Services'

import PagesProduct from '@/pages/Product'

import PagesHome from '@/pages/Home'
import PagesPlan from '@/pages/Plan'

import PagesMyProfile from '@/pages/my/Profile'

import PagesAuthSignup from '@/pages/auth/Signup'
import PagesAuthLogin from '@/pages/auth/Login'

import PagesNotFound from '@/pages/NotFound'

import { getMyProfile } from '@/actions/my/profile'
import PagesMyRequests from '@/pages/my/Requests'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.props.getMyProfile({ hide401Error: true }).finally(() => {
      this.setState({ loaded: true })
    })
  }

  render() {
    const { loaded } = this.state

    return (
      <Router>
        <ToastContainer />
        <LayoutsNavbar />

        {
          loaded ? (
            <Switch>
              <Route exact path="/" component={PagesHome} />

              <PrivateRoute exact path="/my/profile" component={PagesMyProfile} />
              <PrivateRoute exact path="/my/requests" component={PagesMyRequests} />

              <Route path="/auth">
                <AuthRoute exact path="/auth/signup" component={PagesAuthSignup} />
                <AuthRoute exact path="/auth/login" component={PagesAuthLogin} />
              </Route>

              <Route exact path="/plans" component={PagesPlan} />
              <Route exact path="/services" component={PagesServices} />

              <Route exact path="/products" component={PagesProduct} />

              <Route component={PagesNotFound} />
            </Switch>
          ) : (
            <div className="my-3">
              <Loading />
            </div>
          )
        }
      </Router>
    )
  }
}
App.propTypes = {
  getMyProfile: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  getMyProfile
}

export default connect(null, mapDispatchToProps)(App)

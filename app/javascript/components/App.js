import React, { Component } from 'react'
import {
  BrowserRouter as  Router,
  Route,
  Switch
} from 'react-router-dom'
import Navigation from './components/Navigation'
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'

class App extends Component {
  render() {
    const {
      logged_in,
      current_user,
      new_user_route,
      sign_in_route,
      sign_out_route
    } = this.props
    console.log("logged_in:", logged_in)
    console.log("current_user:", current_user)
    console.log("new_user_route:", new_user_route)
    console.log("sign_in_route:", sign_in_route)
    console.log("sign_out_route:", sign_out_route)
    return(
      <Router>
      <Navigation/>
      <h1 className='wrapper'>CASH N COMFORT</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={AboutUs} />
      </Switch>
      <Navigation/>
    </Router>
    )
  }
}

export default App
import React from 'react'
import { Link, Route } from 'react-router-dom'
import SignupForm from './SignupForm'

function App() {
  return (
    <div className="App">
      <h1>Welcome to the App!</h1>
      <ul>
        <li>
          <Link to="/signup/get-started">Signup Form</Link>
        </li>
      </ul>
      <Route path="/signup">
        <SignupForm />
      </Route>
    </div>
  )
}

export default App

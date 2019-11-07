import React from 'react'
import Form from '../forms/Form'
import GetStarted from './GetStarted'
import Address from './Address'

const SignupForm = () => {
  return (
    <div>
      <Form>
        <GetStarted slug="get-started" />
        <Address slug="your-address" />
      </Form>
    </div>
  )
}

export default SignupForm
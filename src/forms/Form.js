import React, { useState } from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'
import FormNav from './FormNav'

export const FormContext = React.createContext()

const Form = ({ children }) => {
  
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const history = useHistory()

  const setValue = (name, value) => {
    setData(prevState => ({ ...prevState, [name]: value }))
  }

  const setError = (name, error) => {
    setErrors(prevState => ({ ...prevState, [name]: error }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submitting: ', data)
  }

  const getCurrent = () => {
    const fieldset = history.location.pathname.split('/')
    return fieldset[fieldset.length - 1]
  }

  const renderChild = Child => {
    if (getCurrent() === Child.props.slug) {
      return <Route render={() => Child} />
    }
  }

  return (
    <FormContext.Provider value={{ data, errors, setValue, setError }}>
      <form onSubmit={handleSubmit}>
        <Switch>
          {React.Children.map(children, ch => renderChild(ch))}
        </Switch>
        <FormNav
          routes={children.map(ch => ch.props.slug)}
          current={getCurrent()}
        />
        <pre>
          Data {JSON.stringify(data, null, 2)}
        </pre>
        <pre>
          Errors {JSON.stringify(errors, null, 2)}
        </pre>
      </form>
    </FormContext.Provider>
  )
}

export default Form
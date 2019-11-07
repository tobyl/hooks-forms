import React from 'react'
import { Link } from 'react-router-dom'

const FormNav = ({ routes, current }) => {

  const getIndex = () => {
    return routes.indexOf(current)
  }

  const isLast = () => {
    return getIndex() === routes.length - 1
  }

  return (
    <div>
      {isLast() ? (
        <>
          <Link to={routes[getIndex() - 1]}>Back</Link>
          <button type="submit">Submit</button>
        </>
      ) : (
        <>
          <Link to={routes[getIndex() + 1]}>Next</Link>
        </>
      )}
    </div>
  )
}

export default FormNav
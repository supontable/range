import React from 'react'
import {RangeContext} from "../RangeContext"

const Counter = () => {
  const [state] = React.useContext(RangeContext)
  return (
    Object.keys(state).map(key => {
      const item = state[key]
      const className = 'App-logo'
      if (item !== false) {
        return (
          <span key={key} className={className}>{item}</span>
        )
      }
      return false
    })
  )
}
export default Counter
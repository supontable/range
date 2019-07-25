import React from 'react'
import {RangeContext} from "../RangeContext"

const Counter = () => {
  const [state,,loading] = React.useContext(RangeContext)
  return (
    Object.keys(state).map(key => {
      const item = state[key]
      const className = loading[key] ? 'App-logo animated' : 'App-logo'
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
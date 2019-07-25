import React, { useState } from 'react'

const RangeContext = React.createContext([{}, () => {}])
const RangeProvider = (props) => {
  const [state, setState] = useState({})
  const [loading, setLoading] = useState({})
  const [conditions, setConditions] = useState({})
  return (
    <RangeContext.Provider value={[state, setState, loading, setLoading, conditions, setConditions]}>
      {props.children}
    </RangeContext.Provider>
  )
}
export {RangeProvider,RangeContext}
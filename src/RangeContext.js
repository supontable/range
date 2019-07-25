import React, { useState } from 'react'

const RangeContext = React.createContext([{}, () => {}])
const RangeProvider = (props) => {
  const [state, setState] = useState({})
  const [loading, setLoading] = useState({})
  return (
    <RangeContext.Provider value={[state, setState, loading, setLoading]}>
      {props.children}
    </RangeContext.Provider>
  )
}
export {RangeProvider,RangeContext}
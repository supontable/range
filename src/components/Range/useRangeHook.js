import React, {useContext} from 'react'
import {RangeContext} from "../../RangeContext"

const useRangeHook = () => {
  const [state, setState,loading,setLoading] = useContext(RangeContext)
  return [state, setState,loading,setLoading]
}

export default useRangeHook

import {useContext} from 'react'
import {RangeContext} from "../../RangeContext"

const useRangeHook = (name) => {
  const [state, setState,loading,setLoading,conditions] = useContext(RangeContext)
  console.log('useRange', name, state[name])
  return [state, setState,loading,setLoading, conditions]
}

export default useRangeHook

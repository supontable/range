import {useContext, useEffect} from 'react'
import {RangeContext} from "../../RangeContext"
import {valueIn} from "../../helpers"

const useRangeHook = (name) => {
  const [state, setState,loading,setLoading,conditions] = useContext(RangeContext)
  // console.log('useRange', name, conditions.real[name], state)
  const {current} = state
  let test = valueIn(conditions.converted[name], state[name])
  useEffect(()=>{
    setState((loadingState)=>({...loadingState, current: test, last: name}))
    console.log(name)
  },[test, setLoading, name])
  useEffect(()=>{
    if (state.last !== name && typeof current === "number") {
      console.log('111', current, state.last,name, conditions.converted[name][current][1])
      setState((loadingState)=>({...loadingState, [name]: conditions.converted[name][current][1]}))
    }
  }, [current])

  return [state, setState,loading,setLoading, conditions]
}

export default useRangeHook

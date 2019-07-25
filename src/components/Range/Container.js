import React, {useContext, useEffect} from 'react'
import Counter from "../Counter"
import Range from "./index"
import {RangeContext} from "../../RangeContext"
import {prepareConditions} from "../../helpers"
import testConditions from "../../models/conditions"

const Container = ({names = []}) => {
  const [state,setState,,,conditions,setConditions] = useContext(RangeContext)
  const [cnd, real, length] = prepareConditions(testConditions, names)
  useEffect(() => {
    async function fetchConditions() {
      setConditions({
        conditions: cnd,
        real: real,
        length: length
      })
      let st = {...real}
      Object.keys(st).map(name=>st[name]=st[name][1])
      setState(st)
    }
    fetchConditions().then()
  }, [])
  if (conditions.real && Object.keys(state).length > 0) {
    return (
      <>
        <div className='App-header'>
          <Counter />
          {names.map((name, key) => {
            const [min, max] = conditions.real ? conditions.real[name] : []
            const deps = state[name]
            console.log('before', name, deps)
            return (
                <Range key={key} deps={deps} name={name} min={min} max={max} init={max}/>
            )
          })}
        </div>
        <div className='App-footer'>
          <Counter />
          {names.map((name, key) => {
            const [min, max] = conditions.real ? conditions.real[name] : []
            const deps = state[name]
            return (
              <Range key={key} deps={deps} name={name} min={min} max={max} init={max}/>
            )
          })}
        </div>
      </>
    )
  } else {
    return <></>
  }
}
export default Container
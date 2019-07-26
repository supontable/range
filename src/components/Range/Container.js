import React, {useContext, useEffect} from 'react'
import Counter from "../Counter"
import Range from "./index"
import {RangeContext} from "../../RangeContext"
import {prepareConditions} from "../../helpers"
import {testConditions} from "../../models/conditions"

const Container = () => {
  const [state,setState,,,conditions,setConditions] = useContext(RangeContext)
  // console.log(testConditions)
  useEffect(() => {
    const [converted, virtual, length] = prepareConditions(testConditions)
    async function fetchConditions() {
      setConditions({
        converted: converted,
        virtual: virtual,
        length: length
      })
      let st = {...virtual}
      Object.keys(st).map(name=>st[name]=st[name][1])
      setState(st)
    }
    // console.log(converted)
    fetchConditions().then()
  }, [])
  if (conditions.virtual && Object.keys(state).length > 0) {
    const names = Array.from(conditions.converted.names)
    return (
      <>
        <div className='App-header'>
          <Counter />
          {names.map((name, key) => <Range name={name} key={key} container={'header-'} />)}
        </div>
        <div className='App-body'>
          <Counter />
          {names.map((name, key) => <Range name={name} key={key} container={'body-'} />)}
        </div>
      </>
    )
  } else {
    return <></>
  }
}
export default Container
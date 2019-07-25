import React from 'react'
import useRangeHook from "./useRangeHook"

const Range = ({min, max, step, marks, name, init = 0}) => {
  const [state, setState,,setLoading] = useRangeHook()
  const inputRef = React.useRef(null)
  React.useEffect(() => {
    inputRef.current.addEventListener('change', () => {
      setLoading(state => ({...state, [name]: false}))
    })
    setState(state => ({...state, [name]:0}))
  },[])
  return (
    <>
      <input type='range'
             value={state[name] || init}
             list="data"
             min={min}
             max={max}
             ref={inputRef}
             step={step}
             // onDragStart={e=>{console.log('ods',e.target)}}
             // onFocus={e=>{console.log('focus',e.target)}}
             // onBlur={e=>{console.log('blur',e.target)}}
             // onMouseOut={e=>{console.log('omo',e.target)}}
             // onInput={e => {console.log('input', e.target.value)}}
             onMouseDown={() => {
               setLoading(state => ({...state, [name]: true}))
             }}
             onChange={e => {
               e.persist();
               setState(state => ({...state, [name]: e.target.value}))
             }} />
      {
        marks &&
        <datalist id="data">
          {marks.map(
            (item, key) => (
              <option key={key} value={item.value} label={item.label}/>
            )
          )}
        </datalist>}
    </>
  )
}
export default Range
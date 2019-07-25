import React from 'react'
import useRangeHook from "./useRangeHook"

const Range = (props) => {
  const {min, max, step, marks, name, init = 0} = props
  const [state, setState,loading,setLoading] = useRangeHook(name)
  const inputRef = React.useRef(null)
  console.log('range render', props.name)
  React.useEffect(() => {
    inputRef.current.addEventListener('change', () => {
      setLoading(state => ({...state, [name]: false}))
    })
    setState(state => ({...state, [name]: init}))
  },[init, name, setLoading, setState])
  return (
        <>
          <input type='range'
                 value={state[name] || init}
                 list="data"
                 min={min}
                 max={max}
                 ref={inputRef}
                 step={step}
                 className={loading[name] ? 'still' : 'loading'}
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
const RangeMeme = React.memo(({deps, ...rest}) => {
  console.log('meme', deps)
  return <Range {...rest} />
})
export default Range
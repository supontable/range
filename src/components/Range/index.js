import React, {useMemo} from 'react'
import useRangeHook from "./useRangeHook"

const Range = ({name, container}) => {
    const [state,setState,loading,,conditions] = useRangeHook(name)
    const [min, max] = conditions.virtual ? conditions.virtual[name] : []
    const step = conditions.converted[`${name}Steps`][0]
    const marks = conditions.converted[`${name}Marks`]
  const inputRef = React.useRef(null)
  const init = max
  let val = state[name]
  let load = loading[name]
  React.useEffect(() => {
    // inputRef.current.addEventListener('change', () => {
    //   setLoading(state => ({...state, [name]: false}))
    // })
    setState(state => ({...state, [name]: init}))
  },[init, name])
    return useMemo(() => {
      return (
      <div className={'container'}>
          <span className={'container__load'}>{load}</span>
          <input type='range'
                 value={state[name] || init}
                 list={`${container+name}Data`}
                 min={min}
                 max={max}
                 ref={inputRef}
                 step={step}
                 className={'still'}
                 // onMouseDown={() => {
                 //   setLoading(state => ({...state, [name]: true}))
                 // }}
                 onChange={e => {
                   e.persist();
                   setState(state => ({...state, [name]: Number(e.target.value)}))
                 }} />
          {
            marks &&
            <datalist id={`${container+name}Data`}>
              {marks.map(
                (item, key) => {
                    // console.log('mark', item)
                    return <option key={key} value={item.value} label={item.label} />
                }
              )}
            </datalist>}
        </div>)}, [val,load]
      )
}

export default Range
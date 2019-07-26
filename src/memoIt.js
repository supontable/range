import React, {useMemo} from 'react'

const MemoIt = ({deps, children, name}) => {
  // console.log(name, ':', deps)
  return useMemo(() => {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }, [deps])
}
export default MemoIt
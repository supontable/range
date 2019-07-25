import React, {useRef, useLayoutEffect} from 'react';
import './App.css';
import './components/Range/range.css';
import Range from "./components/Range"
import {RangeProvider} from "./RangeContext"
import Counter from "./components/Counter"

function App() {
  const myApp = useRef()
  useLayoutEffect(() => {
    return () => (
      window.reactRendered = false
    )
  })
  return (
    <div className="App" ref={myApp}>
      <RangeProvider>
        <div className="App-header">
            <Counter />
            <Range name={'bar'}/>
            <Range name={'foo'}/>
        </div>
        <div className="App-footer">
            <Counter />
            <Range name={'bar'}/>
            <Range name={'foo'}/>
        </div>
      </RangeProvider>
    </div>
  );
}

export default App;

import React, {useRef, useLayoutEffect} from 'react';
import './App.css';
import './components/Range/range.css';
import {RangeProvider} from "./RangeContext"
import Container from "./components/Range/Container"

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
        <Container names={['amount', 'term']}  />
      </RangeProvider>
    </div>
  );
}

export default App;

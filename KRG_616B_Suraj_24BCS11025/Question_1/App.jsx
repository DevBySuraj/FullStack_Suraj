import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(15)

  return (
    <>
      <section id="center">

        <div id="count">Count <br />{count}</div>

        <button className="counter" onClick={() => setCount((count) => count + 1)}>
        Increment
        </button>

        <button className="counter" onClick={() => setCount((count) => count-1)}>
        Decrement
        </button>
        
        <button className="counter" onClick={() => setCount((count) => 0)}>
          reset
        </button>

      </section>
    </>
  )
}

export default App

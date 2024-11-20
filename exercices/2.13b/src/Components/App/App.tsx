import { useState } from 'react'
import RandomDog from '../RandomDog/RandomDog'
import './App.css'

function App() {
  const [key,setKey] = useState(false);

  function clickHandler() {
    setKey(!key)
  }

  return (
    <>
    <button onClick={clickHandler}><h1>New 3 random dog images</h1></button>
      <RandomDog dogKey={key}/>
      <RandomDog dogKey={key}/>
      <RandomDog dogKey={key}/>
    </>
  )
}

export default App

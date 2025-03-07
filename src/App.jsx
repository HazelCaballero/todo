import { useState } from 'react'
import './App.css'
import RoutingByHazel from './routes/RoutingByHazel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='AppContainer'>
     <RoutingByHazel />
     </div>
    </>
  )
}

export default App

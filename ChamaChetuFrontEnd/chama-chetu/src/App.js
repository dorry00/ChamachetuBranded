import Home from './Pages/Homepage/Home'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom'



function App() {
 

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>

    </div>
  )
}

export default App

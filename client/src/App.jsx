import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import SignUp from './components/registration/SignUp'
import SignIn from './components/registration/SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import TaskManager from './pages/taskmanagement/TaskManager'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
      <Header/> 
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/taskmanager' element={<TaskManager/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

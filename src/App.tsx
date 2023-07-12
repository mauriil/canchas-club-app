import LogIn from './components/Login';
import {Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from './contexts/userContext';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  return (
    <>
      <UserContext.Provider value={isLogedIn}>
        <Routes>
          <Route path='/' element={<Navigate to='login'/>}/>
          <Route path='/login' element={<LogIn />}/>
        </Routes >  
      </UserContext.Provider >
    </>
  )
}

export default App

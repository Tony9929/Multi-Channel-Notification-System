import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Reset from './pages/Reset'
import Emailverify from './pages/Emailverify' 
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/reset' element={<Reset/>} />
        <Route path='/emailverify' element={<Emailverify/>} />
      </Routes>
    </div>
  )
}

export default App

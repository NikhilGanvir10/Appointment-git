import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Doct from './pages/doct'
import Login from './pages/login'
import About from './pages/about'
import Contact from './pages/contact'
import MyProfile from './pages/myProfile'
import MyAppointment from './pages/myAppointment'
import Appointment from './pages/appointment'
import Naavbar from './components/naavbar'
import Footer from './components/footer'

function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='mx-4 sm:mx-[10%]'>
      <Naavbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/doct' element={<Doct />}></Route>
        <Route path='/doct/:speciality' element={<Doct />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/myProfile' element={<MyProfile />}></Route>
        <Route path='/myAppointment' element={<MyAppointment />}></Route>
        {/* <Route path='/appointment' element={<Appointment />}></Route> */}
        <Route path='/appointment/:docId' element={<Appointment />}></Route>
      </Routes>
      <Footer />
    </div>  
    </>
  )
}

export default App

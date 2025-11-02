import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Verification from './pages/Verification/Verification'
import BodyMeasurements from './pages/BodyMeasurements/BodyMeasurements'
import ChangePassword from './pages/ChangePassword/CangePassword'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/" element={<Navigate to="/resetpassword" />} />
        <Route path="/" element={<Navigate to="/verification" />} />
        <Route path="/" element={<Navigate to="/bodymeasurements" />} />
        <Route path="/" element={<Navigate to="/changepassword" />} />
        <Route path="/" element={<Navigate to="/homepage" />} />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/bodymeasurements" element={<BodyMeasurements />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}

export default App

import './styles/App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App

import { Fragment, useState } from 'react'
import './styles/App.css'
import SignUp from './pages/SignUp'
import SignIn from './components/sign-in/SignIn'

function App() {
  return (
    <Fragment>
      <SignUp></SignUp>
      {/* <SignIn></SignIn>  */}
    </Fragment>
  )
}

export default App

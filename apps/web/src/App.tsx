import { Fragment, useEffect, useState } from 'react'
import './styles/App.css'
import SignUp from './pages/SignUp'
// import SignIn from './temp/SignIn'
import { AuthService } from "@crypto-payroll/api-client";
import SignIn from './pages/SignIn';

function App() {
  // useEffect(() => {
  //   const signUser = async () => {
  //     try {
  //       const response = await AuthService.postApiV1AuthSignin({
  //         requestBody: {
  //           email: "ojas@gmail.com",
  //           password: "ojas123"
  //         }
  //       })
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   signUser();
  // }, []);
  return (
    <Fragment>
      {/* <CssBaseline />
      <GlobalStyles
        styles={{
          "input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset",
            WebkitTextFillColor: "#000",
            caretColor: "#000"
          },
          "input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px white inset"
          }
        }}
      /> */}
      {/* <SignUp></SignUp> */}
      {/* <SignIn></SignIn>   */}
      <SignIn></SignIn>
    </Fragment>
  )
}

export default App

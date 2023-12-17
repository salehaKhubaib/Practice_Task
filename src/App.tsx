import HomePage from "./Pages/HomePage";
import RootPage from "./Pages/RootPage";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";

import UserAuthContextProvider from "./Context/UserAuthContextProvider";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootPage/>}>
        <Route index element = {<HomePage></HomePage>}></Route> 
        <Route path="login" element ={<LoginPage></LoginPage>}></Route> 
        <Route path="SignUp" element ={<SignUp></SignUp>}></Route> 
      </Route>
    )
  );
  return (
    <UserAuthContextProvider>
    <RouterProvider router={router}/>
    </UserAuthContextProvider>
  
  )
}

export default App

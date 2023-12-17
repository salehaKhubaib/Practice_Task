import {Outlet} from "react-router-dom"
import Navbar from "../Components/Navbar"


const RootPage = () => {
  return (
    <>
    <Navbar></Navbar>
    <section>
     <Outlet></Outlet>
    </section>
    </>
  )
}

export default RootPage

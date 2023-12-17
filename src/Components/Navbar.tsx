import { NavLink } from "react-router-dom"
import { useContextUser } from "../Context/UserAuthContextProvider"
const Navbar = () => {
   const {user} = useContextUser();
   
   
  return (
    <nav className="flex px-8 py-4 bg-slate-200 sticky top-0">
        <div className="logo text-xl flex-1 items-center"><NavLink to = "/">Logo</NavLink></div>
      <ul className="flex gap-4 justify-center items-center">
        {user.id ? <button>Log out</button>:<><li><NavLink to = '/login'>Login</NavLink></li>
        <li><NavLink to = '/SignUp'>Sign Up</NavLink></li></>}
      </ul>
    </nav>
  )
}

export default Navbar

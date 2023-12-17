import { useContextUser } from "../Context/UserAuthContextProvider"

const HomePage = () => {
  const {user} = useContextUser();
  return (
    <div className="flex">
      <h1 className="text-2xl p-3">Welcome to Home Page {user.name} {user.name?" !":null}</h1>
    </div>
  )
}

export default HomePage

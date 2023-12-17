import { createContext, useState, Dispatch, SetStateAction,useContext } from "react";

type UserAuthContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  id: null | string;
  name:string
};

type UserContextProviderType = {
  user: UserContextType;
  setUser: Dispatch<SetStateAction<UserContextType>>;
};

const UserContext = createContext({} as UserContextProviderType);
const UserAuthContextProvider = ({ children }: UserAuthContextProviderProps) => {
  const [user, setUser] = useState<UserContextType>({ id:localStorage.getItem("id") ,name:"" });
  
    console.log("name "+user.name)
  const userContextValue: UserContextProviderType = {
    user,
    setUser
  };
   
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useContextUser= ()=>{
  return useContext(UserContext);
}

export default UserAuthContextProvider;
export { UserContext };

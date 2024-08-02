import { createContext, useContext, useState } from "react";
import useAuthListener from "../hooks/useAuthListener";

const UserContext = createContext()
const UserContextProvider = ({ children }) => {
    const { user } = useAuthListener()
    const [urls, setUrls] = useState([])

    return (
        <UserContext.Provider value={{ user, urls, setUrls }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
export const useUserContext = () => useContext(UserContext)
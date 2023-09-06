import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [currentUser, SetCurrentUser] = useState({username: 'Guest'})
    return (
        <UserContext.Provider value={{...currentUser, SetCurrentUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

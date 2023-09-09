import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../lib/axios"
import { UserContext } from "../context/User"
import Dropdown from 'react-bootstrap/Dropdown'

export default function Settings() {
    const [allUsers, setAllUsers] = useState([]);
    const {username, SetCurrentUser} = useContext(UserContext)

    useEffect(() => {
        getAllUsers()
        .then(data => {
            setAllUsers(data)
        })
    },[])

    function handleUsername(username) {
        SetCurrentUser(allUsers.find(user => user.username === username))
    }

    return (
        <Dropdown>
            <span className="currentUser">Welcome {username}</span>
            <Dropdown.Toggle>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
            </Dropdown.Toggle>
    
            <Dropdown.Menu className="users-dropdown-menu">
                {
                    allUsers.map(user => {
                        return (
                            <Dropdown.Item key={`user-${user.username}`} onClick={() => handleUsername(user.username)}>
                                {user.username}
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>

        
    )
}
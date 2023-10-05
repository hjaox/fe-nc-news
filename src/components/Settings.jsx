import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../lib/axios"
import { UserContext } from "../context/User"
import Dropdown from 'react-bootstrap/Dropdown'

export default function Settings() {
    const [allUsers, setAllUsers] = useState([]);
    const {username, SetCurrentUser} = useContext(UserContext)
    const [showSettingsMenu, setShowSettingsMenu] = useState(false)

    useEffect(() => {
        getAllUsers()
        .then(users => {
            setAllUsers(users)
        })
    },[])

    function handleUsername(username) {
        SetCurrentUser(allUsers.find(user => user.username === username))
    }

    function handleShowSettingsMenu() {
        setShowSettingsMenu(showSettingsMenu => !showSettingsMenu)
    }

    function displayAllUsers(allUsers) {
        return (
            <>
            {
                allUsers.map((user, i) => {
                    return (
                        <span key={i} onClick={() => handleUsername(user.username)}>
                            {user.username}
                        </span>
                    )
                })
            }
            </>
        )
    }

    return (
        // <Dropdown>
        //     <span className="currentUser">Welcome {username}</span>
        //     <Dropdown.Toggle>
        //         <div className="menu-line"></div>
        //         <div className="menu-line"></div>
        //         <div className="menu-line"></div>
        //     </Dropdown.Toggle>
    
        //     <Dropdown.Menu className="users-dropdown-menu">
        //         {
        //             allUsers.map(user => {
        //                 return (
        //                     <Dropdown.Item key={`user-${user.username}`} onClick={() => handleUsername(user.username)}>
        //                         {user.username}
        //                     </Dropdown.Item>
        //                 )
        //             })
        //         }
        //     </Dropdown.Menu>
        // </Dropdown>

        <>
        <div className="settings__dropdown">
            <span className="currentUser">
                Welcome {username}
            </span>
            <span>
                {
                    showSettingsMenu ? (
                        <div className="settings__dropdown--open" onClick={() => handleShowSettingsMenu()}>
                            <div className="settings__dropdown__menu__line--open slash"></div>
                            <div className="settings__dropdown__menu__line--open backslash"></div>
                        </div>
                    ) : (
                        <div className="settings__dropdown--closed" onClick={() => handleShowSettingsMenu()}>
                            <div className="settings__dropdown__menu__line--closed"></div>
                            <div className="settings__dropdown__menu__line--closed"></div>
                            <div className="settings__dropdown__menu__line--closed"></div>
                        </div>
                    )
                }
            </span>
        </div>
        <div className="settings__dropdown__menu">
        {
            showSettingsMenu && displayAllUsers(allUsers)
        }
        </div>
        </>
    )
}
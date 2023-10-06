import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../lib/axios"
import { UserContext } from "../context/User"

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
        <section className='settings'>
            <div className={showSettingsMenu ? "settings__dropdown--expanded" : "settings__dropdown"}>
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
                {
                    showSettingsMenu && (
                        <div className="settings__dropdown__menu">
                            {
                                displayAllUsers(allUsers)
                            }
                        </div>
                    )
                }
            </div>
        </section>
    )
}
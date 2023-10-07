import { useNavigate } from "react-router-dom"

export default function Header() {
    const nav = useNavigate()
    return (
        <h1 onClick={() => nav(`/All`)}>NC News</h1>
    )
}
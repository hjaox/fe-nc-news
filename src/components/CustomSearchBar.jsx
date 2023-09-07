import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { resetCustomSearchForm } from "./DisplayRoutes/script"

export default function CustomSearchBar() {
    const [searchInput, setSearchInput] = useState('')
    const nav = useNavigate()

    function handleSearchInput(event) {
        setSearchInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        resetCustomSearchForm();
        nav(`/articles/${searchInput}`)
    }

    return (
        <form id="customSearchForm" onSubmit={handleSubmit}>
            <label htmlFor="searchInput">Enter Article ID:</label>
            <input name="searchInput" id="searchInput" type="number" onChange={handleSearchInput}/>
            <button type="submit" form="customSearchForm">Search</button>
        </form>
    )
}
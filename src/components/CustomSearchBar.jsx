import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CustomSearchBar() {
    const [searchInput, setSearchInput] = useState('')
    const nav = useNavigate()

    function handleSearchInput(event) {
        setSearchInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        nav(`/articles/${searchInput}`)
    }

    return (
        <form id="customSearchForm" onSubmit={handleSubmit}>
            <label htmlFor="searchInput">Enter Article ID:</label>
            <input name="searchInput"  type="number" onChange={handleSearchInput}/>
            <button type="submit" form="customSearchForm">Search</button>
        </form>
    )
}
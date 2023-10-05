import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CustomSearchBar() {
    const [searchInput, setSearchInput] = useState('')
    const nav = useNavigate()

    useEffect(() => {
    },[setSearchInput])

    function handleSearchInput(event) {
        setSearchInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        nav(`/articles/${searchInput}`)
    }

    return (
        <form id="customSearchForm" className='customSearchForm' onSubmit={handleSubmit}>
            <input name="searchInput" id="searchInput" type="number" onChange={handleSearchInput} placeholder="Search Article #"/>
            <button type="submit" form="customSearchForm">Search</button>
        </form>
    )
}
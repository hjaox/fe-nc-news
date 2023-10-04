import Dropdown from 'react-bootstrap/Dropdown'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ArticleSortingBar({setSortBy, setOrderBy}) {
    const [selectedSortBy, setSelectedSortBy] = useState('Date')
    const [orderByAsc, setOrderByAsc] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    

    useEffect(() => {
        setSortBy(initialState => {
            setSortBy(checkSortVal(selectedSortBy))
        })
        handleSelectedSortBy(selectedSortBy)
    }, [selectedSortBy])

    function handleSelectedSortBy(sortVal) {
        setSelectedSortBy(sortVal)
        setSortBy(checkSortVal(selectedSortBy))
        setSearchParams({sort_by: sortVal})
    }

    function checkSortVal(val) {
        let sortBy = ''
        val === 'Date' ? sortBy = 'created_at' : '';
        val === 'Comment Count' ? sortBy = 'count' : '';
        val === 'Votes' ? sortBy = 'votes' : '';
        return sortBy
    }

    function handleOrderBy(bool) {
        setOrderByAsc(bool)
        bool ? setOrderBy('asc') : setOrderBy('desc')
    }

    return (
        <div className='articleSortingBar'>
            <Dropdown>
            <Dropdown.Toggle>
                {selectedSortBy}
            </Dropdown.Toggle>
    
            <Dropdown.Menu className="sortBy-dropdown-menu">
                <Dropdown.Item onClick={() => handleSelectedSortBy('Date')}>
                                Date
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectedSortBy('Comment Count')}>
                                Comment Count
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectedSortBy('Votes')}>
                                Votes
                </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <div className='order'>
                <button className={`asc ${orderByAsc ? 'active' : ''}`} onClick={() => handleOrderBy(true)}>↑</button>
                <button className={`desc ${!orderByAsc ? 'active' : ''}`} onClick={() => handleOrderBy(false)}>↓</button>
            </div>
        </div>
        
    )
}
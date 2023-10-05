import Dropdown from 'react-bootstrap/Dropdown'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ArticleSortingBar({setSortBy, setOrderBy}) {
    const [selectedSortBy, setSelectedSortBy] = useState('Date')
    const [orderByAsc, setOrderByAsc] = useState(false)
    const [showSortByMenu, setShowSortByMenu] = useState(false)
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
        val === 'Most Comments' ? sortBy = 'count' : '';
        val === 'Votes' ? sortBy = 'votes' : '';
        return sortBy
    }

    function handleOrderBy(bool) {
        setOrderByAsc(bool)
        bool ? setOrderBy('asc') : setOrderBy('desc')
    }

    return (
        <div className='articleSortingBar'>
            <div className='articleSortingBar__dropdown' onClick={() => setShowSortByMenu(showSortByMenu => !showSortByMenu)}>
                <span className='selectedSortBy'>
                    {selectedSortBy}
                </span>
                <div className='articleSortingBar__order'>
                    {
                        orderByAsc ? (
                            <button className={`desc ${!orderByAsc ? 'active' : ''}`} onClick={() => handleOrderBy(false)}>↓</button>
                        ) : (
                            <button className={`asc ${orderByAsc ? 'active' : ''}`} onClick={() => handleOrderBy(true)}>↑</button>
                        )
                    }
                </div>
            </div>
            <div className='articleSortingBar__dropdown__menu'>
                {
                    showSortByMenu && ['Date', 'Most Comments', 'Votes'].map((item, i) => {
                        return (
                            <span key={i} onClick={() => handleSelectedSortBy(item)}>
                                {item}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}
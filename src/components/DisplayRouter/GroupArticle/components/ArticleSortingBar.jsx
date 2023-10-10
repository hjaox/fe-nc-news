import { useEffect, useState } from 'react'
import {RiArrowUpFill, RiArrowDownFill} from 'react-icons/ri'

export default function ArticleSortingBar({sortBy, setSortBy, orderByAsc, setOrderByAsc}) {
    const [showSortByMenu, setShowSortByMenu] = useState(false)
    

    useEffect(() => {
        window.addEventListener('click', event => {
            if(Object.values(event.target.classList).filter(item => !['selectedSortBy--expanded', 'selectedSortBy'].includes(item)).length) {
                setShowSortByMenu(() => false)
            }
        })
    }, [])

    return (
        <div className='articleSortingBar'>
            <div className='articleSortingBar__dropdown'>
                <span className={showSortByMenu ? 'selectedSortBy--expanded' : 'selectedSortBy'} onClick={() => setShowSortByMenu(showSortByMenu => !showSortByMenu)}>
                    {sortBy}
                    {
                    showSortByMenu && (
                        <div className='articleSortingBar__dropdown__menu'>
                            {
                                ['Date', 'Most Comments', 'Votes'].map((item, i) => {
                                    return (
                                        <span key={i} onClick={() => setSortBy(() => item)}>
                                            {item}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    )
                }
                </span>
                <div className='articleSortingBar__order'>
                    {
                        orderByAsc ? (
                            <RiArrowDownFill onClick={() => setOrderByAsc(() => false)}/>
                        ) : (
                            <RiArrowUpFill onClick={() => setOrderByAsc(() => true)}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
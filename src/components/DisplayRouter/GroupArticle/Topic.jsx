import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllArticles, getAllTopics } from "../../../lib/axios";
import ArticleSortingBar from "./components/ArticleSortingBar";
import GroupArticleCard from "./components/GroupArticleCard";
import ErrorTopicPage from "../ErrorPages/ErrorTopicPage";
import {MagnifyingGlass} from 'react-loader-spinner'


export default function Topic() {
    const {selectedTopic} = useParams('')
    const [articlesToDisplay, setArticlesToDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('Date');
    const [orderByAsc, setOrderByAsc] = useState(false);
    const [topicExists, setTopicExists] = useState(true);
    const [showDelayedText, setShowDelayedText] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        getAllArticles(selectedTopic, checkSortVal(sortBy), orderByAsc ? 'asc' : 'desc')
        .then(articles => {
            setArticlesToDisplay(articles);
            setIsLoading(false);
            setShowDelayedText (false)
        })
        .catch(err => {
            if(err.code === 'ERR_NETWORK') {
                alert('Check your internet connection')
            }

            if(err.response.status === 404) {
                setArticlesToDisplay([])
                checkTopicIfExists(selectedTopic)
                .then(bool => {
                    setTopicExists(bool)
                    setIsLoading(false)
                })
            }
        })
    },[selectedTopic, sortBy, orderByAsc])

    function checkTopicIfExists(topicToCheck) {
        return getAllTopics()
        .then(topics => {
            return topics
            .map(topic => topics.slug)
            .includes(topicToCheck)
        })
    }

    function checkSortVal(val) {
        let sortBy = '';
        if(val === 'Date') sortBy = 'created_at';
        if(val === 'Most Comments') sortBy = 'count';
        if(val === 'Votes') sortBy = 'votes';
        return sortBy
    
    }

    function delayedText() {
        setTimeout(() => {
            setShowDelayedText(() => true)
        }, 2000)
    }

    if(!topicExists) {
        return (
            <> <ErrorTopicPage topic={selectedTopic}/> </>
        )
    }

    if(!articlesToDisplay.length)  <p>No articles to display under topic {selectedTopic}</p>

    return (
        <>
        {
            isLoading ? 
            <div className="loadingIndicatorWrapper">
                {delayedText()}
                <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperClass="MagnifyingGlass-wrapper"
                wrapperClassName='loadingIndicator'
                glassColor = 'white'
                color = 'red'
                />
                {showDelayedText && (
                    <p>The first load might take a few seconds. The backend of this app is hosted as a free instance on render.com</p>
                )}
            </div>
            : <>
            <ArticleSortingBar
            setSortBy={setSortBy}
            sortBy={sortBy}
            orderByAsc={orderByAsc}
            setOrderByAsc={setOrderByAsc}/>
            <div className="displayArticlesByTopics">
                <GroupArticleCard articlesToDisplay={articlesToDisplay}/>
            </div>
        </>
        }
        </>
    )
}
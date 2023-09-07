import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllArticles, getAllTopics } from "./axios";
import ArticleSortingBar from "./DisplayRouteComponents/ArticleSortingBar";
import GroupArticleCard from "./DisplayRouteComponents/GroupArticleCard";
import ErrorTopicPage from "./DisplayRouteComponents/ErrorTopicPage";


export default function Topic() {
    const {selectedTopic} = useParams()
    const [articlesToDisplay, setArticlesToDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('')
    const [topicExists, setTopicExists] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        getAllArticles(selectedTopic, sortBy, orderBy)
        .then(articles => {
            setArticlesToDisplay(articles)
            setIsLoading(false)
        })
        .catch(err => {
            if(err.code === 'ERR_NETWORK') {
                alert('Check your internet connection')
            }

            if(err.response.status === 404) {
                // setArticlesToDisplay([])
                // checkTopicIfExists(selectedTopic)
                // .then(bool => {
                //     setTopicExists(bool)
                //     console.log()
                //     setIsLoading(false)
                // })
            }
        })
    },[selectedTopic, sortBy, orderBy])

    // function checkTopicIfExists(topicToCheck) {
    //     return getAllTopics()
    //     .then(topics => {
    //         return topics
    //         .map(topic => topics.slug)
    //         .includes(topicToCheck)
    //     })
    // }

    // if(!topicExists) {
    //     return (
    //         <> <ErrorTopicPage topic={selectedTopic}/> </>
    //     )
    // }

    if(isLoading) {
        return (
            <p>LOADING............</p>
        )
    }

    if(!articlesToDisplay.length) {
        return (
            <p>No articles to display under topic {selectedTopic}</p>
        )
    }

    return (
        <>
        <ArticleSortingBar
            setSortBy={setSortBy}
            setOrderBy={setOrderBy}
            isLoading={isLoading}/>
        <div className="displayArticlesByTopics">
            <GroupArticleCard articlesToDisplay={articlesToDisplay}/>
        </div>
        </>
        
        
    )
}
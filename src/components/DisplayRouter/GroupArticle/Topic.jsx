import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllArticles, getAllTopics } from "../../../lib/axios";
import ArticleSortingBar from "./components/ArticleSortingBar";
import GroupArticleCard from "./components/GroupArticleCard";
import ErrorTopicPage from "../ErrorPages/ErrorTopicPage";


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
                setArticlesToDisplay([])
                checkTopicIfExists(selectedTopic)
                .then(bool => {
                    setTopicExists(bool)
                    console.log()
                    setIsLoading(false)
                })
            }
        })
    },[selectedTopic, sortBy, orderBy])

    function checkTopicIfExists(topicToCheck) {
        return getAllTopics()
        .then(topics => {
            return topics
            .map(topic => topics.slug)
            .includes(topicToCheck)
        })
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
            (<p>LOADING............</p>)
            : ''
        }
        <ArticleSortingBar
            setSortBy={setSortBy}
            setOrderBy={setOrderBy}/>
        <div className="displayArticlesByTopics">
            <GroupArticleCard articlesToDisplay={articlesToDisplay}/>
        </div>
        </>
    )
}
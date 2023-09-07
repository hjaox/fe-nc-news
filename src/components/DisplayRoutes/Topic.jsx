import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllArticles } from "./axios";
import ArticleSortingBar from "./DisplayRouteComponents/ArticleSortingBar";
import GroupArticleCard from "./DisplayRouteComponents/GroupArticleCard";


export default function Topic() {
    const {selectedTopic} = useParams()
    const [articlesToDisplay, setArticlesToDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('')
    
    useEffect(() => {
        setIsLoading(true)
        getAllArticles(selectedTopic, sortBy, orderBy)
        .then(articles => {
            setArticlesToDisplay(articles)
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    },[selectedTopic, sortBy, orderBy])

    if(isLoading) <p>LOADING............</p>

    if(!articlesToDisplay.length) {
        return (
            <p>No articles to display under topic {selectedTopic}</p>
        )
    }

    return (
        <>
        <ArticleSortingBar
            setSortBy={setSortBy}
            setOrderBy={setOrderBy}/>
        <div className="displayArticlesByTopics">
            <GroupArticleCard articlesToDisplay={articlesToDisplay}/>
        </div>
        </>
        
        
    )
}
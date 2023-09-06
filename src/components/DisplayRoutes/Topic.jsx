import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllArticles } from "./axios";
import ArticleCard from "./ArticleCard";

export default function Topic() {
    const {selectedTopic} = useParams()
    const [articlesToDisplay, setArticlesToDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        getAllArticles()
        .then(articles => {
            const filteredArticles = articles.filter(article => article.topic === selectedTopic);
            setArticlesToDisplay(filteredArticles)
            setIsLoading(false)
        })
        .catch(err => {
            alert('Error useEffect Topic')
        })
    },[selectedTopic])

    if(isLoading) <p>LOADING............</p>

    if(!articlesToDisplay.length) {
        return (
            <p>No articles to display under topic {selectedTopic}</p>
        )
    }

    return (
        <div className="displayArticlesByTopics">
            {
            articlesToDisplay.map(article => {
                return (
                    <div key={article.article_id} className='article'>
                    <h3 className="articleTitle">{article.title}</h3>
                    <img className="articleImg" src={article.article_img_url} alt="article-img" />
                    <h4 className="articleAuthor">By: {article.author}</h4>
                    <span className="articleVotes">{article.votes}</span>
                    <span className="articleCommentCount">{article.comment_count}</span>
                </div>
                )
            })
            }
        </div>
        
    )
}
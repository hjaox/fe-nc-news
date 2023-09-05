import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import { getAllArticles } from "./axios"

export default function AllArticles() {
    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getAllArticles()
        .then(articles => {
            handleArticlesData(articles)
            setIsLoading(false)
        })
    },[])

    function handleArticlesData(articles) {
        setArticles(articles.map(article => {
            return (
                <div key={article.article_id} className='article'>
                    <h3 className="articleTitle">{article.title}</h3>
                    <img className="articleImg" src={article.article_img_url} alt="article-img" />
                    <h4 className="articleAuthor">By: {article.author}</h4>
                    <span className="articleVotes">{article.votes}</span>
                    <span className="articleCommentCount">{article.comment_count}</span>
                </div>
            )
        }))
    }

    if(isLoading) return <p>LOADING...............</p>

    return (
        <div className="displayAllArticles">
            {articles}
        </div>
    )
}
import axios from "axios"
import { useEffect, useState } from "react"

export default function AllArticles() {
    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get('https://nc-news-ee7w.onrender.com/api/articles?limit=100')
        .then(({data: {articles}}) => {
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
        <div className="displayAllItems">
            {articles}
        </div>
    )
}
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
            return ArticleCard(article)
        }))
    }

    if(isLoading) return <p>LOADING...............</p>

    return (
        <div className="displayAllArticles">
            {articles}
        </div>
    )
}
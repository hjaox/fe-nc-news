export default function ArticleCard(article) {
    return (
        <div key={article.article_id} className='article'>
            <h3 className="articleTitle">{article.title}</h3>
            <img className="articleImg" src={article.article_img_url} alt="article-img" />
            <h4 className="articleAuthor">By: {article.author}</h4>
            <span className="articleVotes">{article.votes}</span>
            <span className="articleCommentCount">{article.comment_count}</span>
        </div>
    )
}
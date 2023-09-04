export default function ArticleCard(article) {
    return (
        <div key={article.article_id} className='article'>
            <h3 className="articleTitle">{article.title}</h3>
            <img className="articleImg" src={article.article_img_url} alt="article-img" />
            <h5 className="articleAuthor">By: {article.author}</h5>
            <p className="articleBody">{article.body}</p>
            <span className="articleVotes">{article.votes}</span>
            <span className="articleCommentCount">{article.comment_count}</span>
        </div>
    )
}
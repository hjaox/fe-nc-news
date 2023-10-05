import { useNavigate } from "react-router-dom";

export default function GroupArticleCard({articlesToDisplay}) {
    const nav = useNavigate()

    function handleTitleClick(id) {
        nav(`/articles/${id}`)
      }

    return (
        <>
        {
            articlesToDisplay.map(article => {
                return (
                    <div key={article.article_id} className='article'>
                    <h3 className="articleTitle" onClick={()=> handleTitleClick(article.article_id)}>
                        {article.article_id}# {article.title}
                    </h3>
                    <img className="articleImg" src={article.article_img_url} alt="article-img" />
                    <h4 className="articleAuthor">By {article.author}</h4>
                    <span className="articleVotes">
                        Votes {article.votes}
                    </span>
                    <span className="articleCommentCount">
                        Comments {article.comment_count}
                    </span>
                    <span className="articleDate">
                        {new Date(article.created_at).toDateString()}
                    </span>
                </div>
                )
            })
        }
        </>
    )
}
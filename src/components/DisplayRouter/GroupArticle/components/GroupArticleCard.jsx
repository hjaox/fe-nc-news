import { useNavigate } from "react-router-dom";
import { FcLike } from 'react-icons/fc'
import { BiCommentDetail } from 'react-icons/bi'

export default function GroupArticleCard({articlesToDisplay}) {
    const nav = useNavigate()

    function handleTitleClick(id) {
        nav(`/articles/${id}`)
      }

    function handleCommentClick(id) {
        nav(`/articles/${id}#comments`)
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
                    <img className="articleImg" src={article.article_img_url} alt="article-img" onClick={()=> handleTitleClick(article.article_id)}/>
                    <h4 className="articleAuthor">Posted By: {article.author}</h4>
                    <span className="articleVotes">
                        <FcLike/> {article.votes} Likes
                    </span>
                    <span className="articleCommentCount" onClick={() => handleCommentClick(article.article_id)}>
                        <BiCommentDetail/> {article.comment_count} Comments
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

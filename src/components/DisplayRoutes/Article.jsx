import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from './axios';
import ArticleCard from './ArticleCard';
import { getCommentsByArticleID } from './axios';
import CommentCard from './CommentCard';

export default function Article() {
    const [articleToDisplay, setArticleToDisplay] = useState([]);
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const {article_id} = useParams();
    
    useEffect(() => {
        const promises = [getArticle(article_id), getCommentsByArticleID(article_id)];
        Promise.all(promises)
        .then(([article,comments]) => {
            setArticleToDisplay(article);
            handleCommentsData(comments)
        })
    },[])

    function handleCommentsData(comments) {
        setCommentsToDisplay(comments)
    }
    
    return (
        <div className='displaySingleArticle'>
            Single Article Display
            {/* {ArticleCard(articleToDisplay)} */}
            <ArticleCard article={articleToDisplay}/>
            {
                commentsToDisplay.map(comment => {
                    return (
                        <div key={comment.comment_id} className="comment">
                            <CommentCard comment={comment}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
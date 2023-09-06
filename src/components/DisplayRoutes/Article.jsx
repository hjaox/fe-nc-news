import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from './axios';
import ArticleCard from './ArticleCard';
import { getCommentsByArticleID } from './axios';
import CommentCard from './CommentCard';
import { UserContext } from '../../context/User';
import { postComment } from './axios';
import { resetCommentForm } from './script';

export default function Article() {
    const [articleToDisplay, setArticleToDisplay] = useState([]);
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const [commentFormBody, setCommentFormBody] = useState('')
    const [isPosting, setIsPosting] = useState(false)
    const {article_id} = useParams();
    const {username} = useContext(UserContext);
    
    useEffect(() => {
        const promises = [getArticle(article_id), getCommentsByArticleID(article_id)];
        Promise.all(promises)
        .then(([article,comments]) => {
            setArticleToDisplay(article);
            setCommentsToDisplay(comments)
        })
        resetCommentForm();
    },[article_id])

    function handleSubmitForm(e) {
        e.preventDefault();
        setIsPosting(true)
        if(username === 'Guest') {
            setIsPosting(false)
            return alert('Change Guest into one of the users. selection top right')
        }
        postComment(article_id, commentFormBody, username)
        .then(postedComment => {
            setCommentsToDisplay([postedComment, ...commentsToDisplay]);
            resetCommentForm();
            setIsPosting(false)
        })
        .catch(err => {
            alert('Server Error, comment not sent')
        })
    }

    function handleCommentFormInput(e) {
        setCommentFormBody(e.target.value)
    }

    

    return (
        <div className='displaySingleArticle'>
            Single Article Display
            <ArticleCard article={articleToDisplay}/>
            <form className='commentForm' id='commentForm' onSubmit={(e) => handleSubmitForm(e)}>
                <input type="text" id='commentFormBody' className='commentFormBody' onChange={(e) => handleCommentFormInput(e)}/>
                {isPosting ? (<p>POSTING...</p>) : ''}
                <button form='commentForm' type='submit'>Submit</button>
            </form>
            <div className='comments'>
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
            
        </div>
    )
}
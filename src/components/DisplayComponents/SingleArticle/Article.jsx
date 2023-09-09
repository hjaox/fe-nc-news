import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../../../lib/axios';
import SingleArticleCard from './ArticleComponents/SingleArticleCard';
import { getCommentsByArticleID } from '../../../lib/axios';
import CommentCard from './ArticleComponents/CommentCard';
import { UserContext } from '../../../context/User';
import { postComment } from '../../../lib/axios';
import { resetCommentForm } from '../../script';
import ErrorArticlePage from '../ErrorPages/ErrorArticlePage';

export default function Article() {
    const [articleToDisplay, setArticleToDisplay] = useState([]);
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const [commentFormBody, setCommentFormBody] = useState('')
    const [isPosting, setIsPosting] = useState(false)
    const {article_id} = useParams();
    const {username} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [articleExists, setArticleExists] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        const promises = [getArticle(article_id), getCommentsByArticleID(article_id)];
        Promise.all(promises)
        .then(([article,comments]) => {
            setArticleToDisplay(article);
            setCommentsToDisplay(comments)
            setIsLoading(false);
            resetCommentForm();
        })
        .catch(err => {
            if(err.response.status === 404) {
                setArticleExists(false)
            }
            
        })
        
    },[article_id])

    if(!articleExists) {
        return (
            <><ErrorArticlePage article_id={article_id}/></>
        )
    }

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
            {
                isLoading ? (<p>LOADING...</p>) : ''
            }
            <SingleArticleCard article={articleToDisplay}/>
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
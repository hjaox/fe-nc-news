import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getArticle } from '../../../lib/axios';
import SingleArticleCard from './ArticleComponents/SingleArticleCard';
import { getCommentsByArticleID } from '../../../lib/axios';
import CommentCard from './ArticleComponents/CommentCard';
import { UserContext } from '../../../context/User';
import { postComment } from '../../../lib/axios';
import { resetCommentForm } from '../../script';
import ErrorArticlePage from '../ErrorPages/ErrorArticlePage';
import {MagnifyingGlass} from 'react-loader-spinner'


export default function Article() {
    const [articleToDisplay, setArticleToDisplay] = useState([]);
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const [commentFormBody, setCommentFormBody] = useState('');
    const [isPosting, setIsPosting] = useState(false)
    const {article_id} = useParams();
    const {username} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [articleExists, setArticleExists] = useState(true);
    const location = useLocation();
    const [showDelayedText, setShowDelayedText] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)
        const promises = [getArticle(article_id), getCommentsByArticleID(article_id)];
        Promise.all(promises)
        .then(([article,comments]) => {
            setArticleToDisplay(article);
            setCommentsToDisplay(comments)
            setIsLoading(false);
            resetCommentForm();
            setShowDelayedText(false)

            if(location.hash) {
                const elem = document.getElementById(location.hash.slice(1))
                elem ? elem.scrollIntoView({behavior: 'smooth'}) : window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }

        })
        .catch(err => {
            if(err.response.status === 404) {
                setArticleExists(false)
            }
        })
    },[location])
    

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

    function delayedText() {
        setTimeout(() => {
            setShowDelayedText(() => true)
        }, 2000)
    }
    
    return (
        <div className='displaySingleArticle'>
            {
                isLoading ? 
                <div className="loadingIndicatorWrapper">
                    {delayedText()}
                    <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperClass="MagnifyingGlass-wrapper"
                    wrapperClassName='loadingIndicator'
                    glassColor = 'white'
                    color = 'red'
                    />
                    {showDelayedText && (
                        <p>The first load might take a few seconds. The backend of this app is hosted as a free instance on render.com</p>
                    )}
                </div> : 
                <>
                <SingleArticleCard article={articleToDisplay}/>
                <form className='commentForm' id='commentForm' onSubmit={(e) => handleSubmitForm(e)}>
                    <input type="text" id='commentFormBody' className='commentFormBody' onChange={(e) => handleCommentFormInput(e)} placeholder='Enter your comment....'/>
                    {isPosting ? (<p>POSTING...</p>) : ''}
                    <button className='submitButton' form='commentForm' type='submit'>Submit</button>
                </form>
                <div className='comments' id='comments'>
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
                </>
            }
            
        </div>
    )
}

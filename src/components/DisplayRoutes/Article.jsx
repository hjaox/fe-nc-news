import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from './axios';
import ArticleCard from './ArticleCard';
import { getCommentsByArticleID } from './axios';
import CommentsCard from './CommentsCard';

export default function Article() {
    const [articleToDisplay, setArticleToDisplay] = useState([]);
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const {article_id} = useParams();
    
    useEffect(() => {
        const promises = [getArticle(article_id), getCommentsByArticleID(article_id)];
        Promise.all(promises)
        .then(([article,comments]) => {
            setArticleToDisplay(ArticleCard(article));
            handleCommentsData(comments)
        })
    },[])

    function handleCommentsData(comments) {
        setCommentsToDisplay(comments.map(comment => {
            return CommentsCard(comment)
        }))
    }


    return (
        <div className='displaySingleArticle'>
            Single Article Display
            <>{articleToDisplay}</>
            <>{commentsToDisplay}</>
        </div>
    )
}
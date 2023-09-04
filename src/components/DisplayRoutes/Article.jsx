import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { getArticle } from './axios';
import ArticleCard from './ArticleCard';

export default function Article() {
    const [articleToDisplay, setArticleToDisplay] = useState([])
    const {article_id} = useParams()
    
    useEffect(() => {
        getArticle(article_id)
        .then(article => {
            setArticleToDisplay(ArticleCard(article))
        })
    },[])


    return (
        <div className='displaySingleArticle'>
            Single Article Display
            <>{articleToDisplay}</>
        </div>
    )
}
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://nc-news-ee7w.onrender.com'
})

export function getArticle(article_id) {
    return instance.get(`/api/articles/${article_id}`)
    .then(({data: {article}}) => {
        return article
    })
    .catch(err => {
        console.log(err)
    })
}

export function getAllArticles() {
    return instance.get(`/api/articles?limit=100`)
    .then(({data: {articles}}) => {
        return articles
    })
    .catch(err => {
        console.log(err)
    })
}

export function getCommentsByArticleID(article_id) {
    return instance.get(`/api/articles/${article_id}/comments`).
    then(({data: {comments}}) => {
        return comments
    })
}

export function patchArticleByVote(article, upvote) {
    const {article_id} = article;
    const updatedData = upvote ? {inc_votes: 1} : {inc_votes: -1};
    console.log(article.votes, 'axios')
    return instance.patch(`/api/articles/${article_id}`, updatedData)
    .then(({data}) => {
        console.log('here')
        console.log(data)
    })
    
}
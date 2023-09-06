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
    return instance.patch(`/api/articles/${article_id}`, updatedData)
    .then(({data}) => {
        return data
    })
    
}

export function getAllTopics() {
    return instance.get('/api/topics')
    .then(({data}) => {
        return data
    })
}

export function getAllUsers() {
    return instance.get('/api/users')
    .then(({data: {users}}) => {
        return users
    })
}

export function postComment(article_id, body, author) {
    const updatedData = {body, author}
    return instance.post(`/api/articles/${article_id}/comments`, updatedData)
    .then(({data: {postedComment}}) => {
        return postedComment
    })
}
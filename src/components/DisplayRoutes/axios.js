import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://nc-news-ee7w.onrender.com'
    // baseURL: 'http://localhost:9090'
})

export function getArticle(article_id) {
    return instance.get(`/api/articles/${article_id}`)
    .then(({data: {article}}) => {
        return article
    })
}

export function getAllArticles(topic, sortBy, orderBy) {
    let baseUrl = '/api/articles?limit=100';
    baseUrl += topic && topic !== 'All' ? `&topic=${topic}` : '';
    baseUrl += sortBy ? `&sort_by=${sortBy}` : '';
    baseUrl += orderBy ? `&order=${orderBy}` : '';
    return instance.get(baseUrl)
    .then(({data: {articles}}) => {
        return articles
    })
}

export function getCommentsByArticleID(article_id) {
    return instance.get(`/api/articles/${article_id}/comments`).
    then(({data: {comments}}) => {
        return comments
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

export function patchArticleByVote(article, upvote) {
    const {article_id} = article;
    const updatedData = upvote ? {inc_votes: 1} : {inc_votes: -1};
    return instance.patch(`/api/articles/${article_id}`, updatedData)
    .then(({data}) => {
        return data
    })
    
}

export function deleteComment(id) {
    return instance.delete(`/api/comments/${id}`)
}




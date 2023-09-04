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
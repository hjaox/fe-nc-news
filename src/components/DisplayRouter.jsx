import { Routes, Route } from 'react-router-dom'
import Article from './DisplayComponents/SingleArticle/Article'
import Topic from './DisplayComponents/GroupArticle/Topic'
import ErrorPage from './DisplayComponents/ErrorPages/ErrorPage'
import ErrorArticlePage from './DisplayComponents/ErrorPages/ErrorArticlePage'

export default function DisplayRouter() {
    return (
        <>
        <Routes>
            <Route path='/' element={<Topic />}/>
            <Route path='/:selectedTopic' element={<Topic />}/>
            <Route path='/articles/:article_id' element={<Article />}/>
            <Route path='/*' element={<ErrorPage />}/>
            <Route path='/articles/*' element={<ErrorArticlePage />}/>
            <Route/>
        </Routes>
        </>
    )
}
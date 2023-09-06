import { Routes, Route } from 'react-router-dom'
import AllArticles from './DisplayRoutes/AllArticles'
import Article from './DisplayRoutes/Article'
import Topic from './DisplayRoutes/Topic'

export default function DisplayRouter() {
    return (
        <>
        Display Router
        <Routes>
            <Route path='/' element={<AllArticles />}/>
            <Route path='/articles/:article_id' element={<Article />}/>
            <Route path='/topics/:selectedTopic' element={<Topic />}/>
            <Route/>
        </Routes>
        </>
    )
}
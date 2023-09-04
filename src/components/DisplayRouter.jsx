import { Routes, Route } from 'react-router-dom'
import AllArticles from './DisplayRoutes/AllArticles'
import Article from './DisplayRoutes/Article'

export default function DisplayRouter() {
    return (
        <>
        Display Router
        <Routes>
            <Route path='/articles/all' element={<AllArticles />}/>
            <Route path='/articles/:article_id' element={<Article />}/>
            <Route/>
        </Routes>
        </>
    )
}
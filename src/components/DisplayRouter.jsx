import { Routes, Route } from 'react-router-dom'
import Article from './DisplayRoutes/Article'
import Topic from './DisplayRoutes/Topic'

export default function DisplayRouter() {
    return (
        <>
        Display Router
        <Routes>
            <Route path='/articles/:article_id' element={<Article />}/>
            <Route path='/:selectedTopic' element={<Topic />}/>
            <Route/>
        </Routes>
        </>
    )
}
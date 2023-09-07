import { Routes, Route } from 'react-router-dom'
import Article from './DisplayRoutes/Article'
import Topic from './DisplayRoutes/Topic'

export default function DisplayRouter() {
    return (
        <>
        Display Router
        <Routes>
            <Route path='/' element={<Topic />}/>
            <Route path='/:selectedTopic' element={<Topic />}/>
            <Route path='/articles/:article_id' element={<Article />}/>
            
            <Route/>
        </Routes>
        </>
    )
}
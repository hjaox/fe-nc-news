import { Routes, Route } from 'react-router-dom'
import Article from './DisplayRoutes/Article'
import Topic from './DisplayRoutes/Topic'
import ErrorPage from './DisplayRoutes/DisplayRouteComponents/ErrorPage'
import ErrorArticlePage from './DisplayRoutes/DisplayRouteComponents/ErrorArticlePage'
import Test from './DisplayRoutes/DisplayRouteComponents/Test'

export default function DisplayRouter() {
    return (
        <>
        <Routes>
            <Route path='/' element={<Topic />}/>
            <Route path='/:selectedTopic' element={<Topic />}/>
            <Route path='/articles/:article_id' element={<Article />}/>
            <Route path='/*' element={<ErrorPage />}/>
            <Route path='/articles/*' element={<ErrorArticlePage />}/>
            <Route path='/test' element={<Test />}/>
            <Route/>
        </Routes>
        </>
    )
}
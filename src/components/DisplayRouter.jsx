import { Routes, Route } from 'react-router-dom'
import AllArticles from './DisplayRoutes/AllArticles'

export default function DisplayRouter() {
    return (
        <>
        Display Router
        <Routes>
            <Route path='/articles/all' element={<AllArticles />}/>
        </Routes>
        </>
    )
}
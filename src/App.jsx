import './App.css'
import Header from './components/Header'
import TopicsBar from './components/TopicsBar'
import DisplayRouter from './components/DisplayRouter'
import CustomSearchBar from './components/CustomSearchBar'
import Settings from './components/Settings'

function App() {

  return (
    <>
      <header className='header'>
        <Header/>
      </header>
      <main>
        <section className='settings'>
          <Settings/>
        </section>
        <section className='customsearchbar'>
          <CustomSearchBar/>
        </section>
        <section className='topicsbar'>
          <TopicsBar/>
        </section>
        <section className='displayrouter'>
          <DisplayRouter/>
        </section>
      </main>
    </>
    
  )
}

export default App

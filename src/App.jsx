import './App.css'
import Header from './components/Header'
import TopicsBar from './components/TopicsBar'
import DisplayRouter from './components/DisplayRouter'
import CustomSearchBar from './components/CustomSearchBar'
import Settings from './components/Settings'

function App() {

  return (
    <>
    <div className='header'>
      <header>
        <Header/>
      </header>
      <section className='settings'>
          <Settings/>
        </section>
    </div>
      
      <main>        
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

import './App.css'
import Header from './components/Header'
import TopicsBar from './components/TopicsBar'
import DisplayRouter from './components/DisplayRouter/DisplayRouter'
import CustomSearchBar from './components/CustomSearchBar'
import Settings from './components/Settings'

function App() {

  return (
    <>
      <header className='header'>
        <Header/>
      </header>
      <section className='settings'>
          <Settings/>
      </section>
      <section className='customSearchBar'>
        <CustomSearchBar/>
      </section>
      <section className='topicsBar'>
        <TopicsBar/>
      </section>
      <section className='displayRouter'>
        <DisplayRouter/>
      </section>

    </>
    
  )
}

export default App

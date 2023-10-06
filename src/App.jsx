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
      
          <Settings/>
      
      <section className='customSearchBar'>
        <CustomSearchBar/>
      </section>
        <TopicsBar/>
      <section className='displayRouter'>
        <DisplayRouter/>
      </section>

    </>
    
  )
}

export default App

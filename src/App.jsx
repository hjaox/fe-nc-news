import './App.css'
import Header from './components/Header'
import TopicsBar from './components/TopicsBar'
import DisplayRouter from './components/DisplayRouter'
import CustomSearchBar from './components/CustomSearchBar'
import Settings from './components/Settings'

function App() {

  return (
    <>
      <header>
        <Header/>
      </header>
      <section className='settings'>
          <Settings/>
      </section>
      <div className='border1'></div>
      <section className='customsearchbar'>
        <CustomSearchBar/>
      </section>
      <section className='topicsbar'>
        <TopicsBar/>
      </section>
      <div className='border2'></div>
      <section className='displayrouter'>
        <DisplayRouter/>
      </section>

    </>
    
  )
}

export default App

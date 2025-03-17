import { useEffect, useState } from 'react'

import Search from './components/Search'

const App = () => {

  const [searchTerm, setSearchTeam] = useState('');

  return (
    <div className='pattern'>
     <div className='wrapper'>
        <header>
          <img src="./public/hero.png" alt="banner" />
          <h1> <span className='text-gradient'> Find Movies</span> You'll Enjoy Without The Hassle</h1>
        </header>
        <Search searchTerm = {searchTerm} setSearchTeam = {setSearchTeam} />
        <h1 className='text-white'>{searchTerm}</h1>
     </div>
    </div>
  )
} 
export default App

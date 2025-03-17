import { useEffect, useState } from 'react'

import './App.css'

const App = () => {
  return (
    <div className='card-container'>
      <Card  title = "Holaa"/>
      <Card  title = "Avatar"/>
      <Card  title = "Lion king"/>
      <Card  title = "Holaa"/>

    </div>
  )
}

const Card = ({title}) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  
  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]); // Dependencia para que el efecto se ejecute cuando cambia `hasLiked`
  

  return (
    <div className='card' onClick={() => setCount(count +1)}>
      <h2>{title} - {count}</h2>
      <button onClick={()=> setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '🤍'}
      </button>
    
    </div>
  )
}
 

export default App

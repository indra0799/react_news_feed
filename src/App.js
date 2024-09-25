
import './App.css';
import NavBar from './components/navBar';
import News_posts from './components/news_posts';
import SwipeButton from './components/swipe';
import { useState  } from 'react';



function App() {


  const [articles, setArticles] = useState([]); // array to store api data
  const [loading, setLoading] = useState(false); // to show loading status
  const [waiting_to_swipe, setWaiting_to_swipe]= useState(true); 

  // NewsAPI key
  const API_KEY = 'c385aa2d884845a9b5c8ba3b6e05c59b';

  // Fetch news from NewsAPI
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
      const data = await response.json();
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };
  // changes swipe button to posts when swiped
  const handleComplete = () => {
    setWaiting_to_swipe(false);

    fetchNews();
    
  };

  
  

  return (
    <div className="App">
      <div className='app_subBlock'>

      <div>
        {/* navbar for heading news feed*/}
        <NavBar/> 

      </div>

      <div className='foot_block'>
         { waiting_to_swipe && <SwipeButton onComplete={handleComplete} /> }   {/* shows swipe button until swipes */}
        { loading && <h4>loading</h4>}                                          {/* informs while loading */}                              
        { !waiting_to_swipe && <News_posts news={articles}/> }                  {/* news component after swiped */}
      </div>

      </div>
    </div>
  );
}

export default App;









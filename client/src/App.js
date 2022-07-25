import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Details from './Components/Details/Details';
import { NewGame } from './Components/NewGame/NewGame';

function App() {

  return (

    <BrowserRouter>
     
      <Routes>

        <Route 
          path='/'
          element={<LandingPage />}
        />

        <Route
          path='/home'
          element={<Home />}
        />

        <Route 
          path="/videogames/:id"
          element={<Details />}
        />

        <Route 
          path='/videogame'
          element={<NewGame />}
        />

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;

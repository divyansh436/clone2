import './App.scss';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './Components/Home/Home';
import Header from './Components/Home/Header/Header';

function App() {
  return (
    <div className="App">
      <Router>

        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

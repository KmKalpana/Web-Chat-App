import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Homepage'
function App() {
  return (
    <Router>
        <div className='app'>
        <Routes>
        <Route path='/' element={<div><Home /></div>}/>
        </Routes>
        </div>
        </Router>
  );
}

export default App;

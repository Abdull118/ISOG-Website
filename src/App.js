import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className='background'>
    <Provider store={store}>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </Provider>
    </div>
  );
}

export default App;

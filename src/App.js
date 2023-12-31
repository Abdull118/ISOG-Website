import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import store from './store/store';
import Admin from './pages/Admin';

function App() {
  return (
    <>
    <Provider store={store}>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' element={<Admin />}/>
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;

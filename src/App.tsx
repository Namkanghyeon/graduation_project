import { Route, Routes } from 'react-router-dom';
import './styles/style.css';
import Header from './Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="outer-container">
      <div className="inner-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

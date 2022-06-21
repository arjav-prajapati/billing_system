import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Billing_main from './components/billing_main';
import ItemState from './context/itemState';

function App() {
  return (
    <div className="App">
      <ItemState>
        <Router>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<Billing_main />} />
            </Routes>
          </Suspense>
        </Router>
      </ItemState>
    </div>
  );
}

export default App;

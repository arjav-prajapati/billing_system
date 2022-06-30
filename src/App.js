import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ItemState from './context/itemState';
import InvoiceState from './context/invoiceState';
import BillingMain from './components/billingMain';

function App() {
  return (
    <div className="App">
      <ItemState>
        <InvoiceState>
          <Router>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route exact path="/" element={<BillingMain />} />
              </Routes>
            </Suspense>
          </Router>
        </InvoiceState>
      </ItemState>
    </div>
  );
}

export default App;

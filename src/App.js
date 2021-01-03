import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppView from './views/AppView';
import TransactionView from './views/TransactionView';
import NotFoundView from './views/NotFoundView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/hisaab' element={<AppView />} />
        <Route path='/hisaab/contact/:id' element={<TransactionView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}
export default App;

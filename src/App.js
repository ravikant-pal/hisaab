import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppView from './views/AppView';
import TransactionView from "./views/TransactionView";
import NotFoundView from './views/NotFoundView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppView />}/>
        <Route path="/contact/:id" element={<TransactionView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}
export default App;

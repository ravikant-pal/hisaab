import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFoundView from './views/NotFoundView';
import MonthView from "./views/MonthView";
import ContactTxnView from "./views/ContactTxnView";
import MonthTxnView from "./views/MonthTxnView";

import ContactView from './views/ContactView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/hisaab' element={<Navigate to="/hisaab/contacts" />} />
        <Route path='/hisaab/contacts' element={<ContactView />} />
        <Route path='/hisaab/months' element={<MonthView />} />
        <Route path='/hisaab/contact/:id' element={<ContactTxnView />} />
        <Route path='/hisaab/month/:id' element={<MonthTxnView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}
export default App;

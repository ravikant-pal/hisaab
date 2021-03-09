import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFoundView from './views/NotFoundView';
import CalendarView from "./views/CalendarView";
import ContactTxnView from "./views/ContactTxnView";

import ContactView from './views/ContactView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/hisaab/contacts" />} />
        <Route path='/hisaab/contacts' element={<ContactView />} />
        <Route path='/hisaab/daily' element={<CalendarView />} />
        <Route path='/hisaab/contact/:id' element={<ContactTxnView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}
export default App;

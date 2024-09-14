import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/Form';
import AccountInfo from './components/AccountInfo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/account-info" element={<AccountInfo />} />
      </Routes>
    </Router>
  );
};

export default App;

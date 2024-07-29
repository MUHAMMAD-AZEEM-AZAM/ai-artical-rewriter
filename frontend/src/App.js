import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Authentication/Login/Login';
import ResetPassword from './pages/Authentication/ResetPassword/ResetPassword';
import SignUp from './pages/Authentication/SignUp/SignUp';
import History from './pages/History/History';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { HistoryContextProvider } from './context/HistroyContext';
import EnterCode from './pages/Authentication/EnterCode/EnterCode';

const App = () => {
  return (
    <HistoryContextProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="entercode" element={<EnterCode/>} />
        <Route path="resetpassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
    </HistoryContextProvider>
  );
};

export default App;

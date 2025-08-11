import { useQuery } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BaseUrl from './constant/Url';
import {Front} from './sign/login/Front.jsx';
import {Login} from './sign/login/Login.jsx';
import SignUp from './sign/login/SignUp.jsx';
import {Home} from './sign/login/Home.jsx';
import {Settings} from './sign/login/Settings.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [noti, setNoti] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch(`${BaseUrl}/api/auth/getMe`, { credentials: 'include' });
      const data = await res.json();
      return res.ok ? data : null;
    },
    retry: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (authUser) navigate('/home');
  }, [authUser, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {authUser && <Settings setShowSidebar={setShowSidebar} showSidebar={showSidebar} setNoti={setNoti} noti={noti} />}
<button 
  onClick={() => setShowSidebar(!showSidebar)} 
  className="block  sm:hidden absolute text-2xl m-5">
  ☰
</button>
      <ToastContainer  autoClose={3000}/>
      <Routes basename="/xapp">
        <Route path="/" element={authUser ? <Navigate to="/home" /> : <Front />} />
        <Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <SignUp />} />
        <Route path="/home" element={authUser ? <Home notifi={noti}  setNoti={setNoti} /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App

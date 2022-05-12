import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/home';
import Login from './pages/login';
import {AdminFeedback} from './pages/admin/feedback';
import UserSettings from './pages/settings';
import Feedback from './pages/feedback';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminFeedback />} />
      <Route path="/settings" element={<UserSettings />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  )
}

export default AppRoutes;

import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes';
import Navigation from '../components/navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

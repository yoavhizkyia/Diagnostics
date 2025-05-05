import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css'
import App from './App'
import Layout from './pages/layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<App />} />
      </Routes>
    </Layout>
  </BrowserRouter>
  </StrictMode>,
)

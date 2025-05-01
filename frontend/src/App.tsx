import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FlipVertical as Analytics, GlassWater, Github } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { INITIAL_DATA } from './constants.ts';
import { SiteData } from './types.ts';

// Components
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';

// Pages
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import PortfolioPage from './pages/PortfolioPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('injung_site_data');
      if (!saved || saved === 'undefined') return INITIAL_DATA;
      const parsed = JSON.parse(saved);
      if (!parsed.config || !parsed.services || !parsed.portfolio) return INITIAL_DATA;
      return parsed;
    } catch (e) {
      console.error("Failed to load site data:", e);
      return INITIAL_DATA;
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('injung_site_data', JSON.stringify(siteData));
  }, [siteData]);

  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white selection:bg-purple-500 selection:text-white">
        <Navbar 
          siteName={siteData.config.companyName} 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage data={siteData} />} />
            <Route path="/about" element={<AboutPage data={siteData} />} />
            <Route path="/services" element={<ServicesPage data={siteData} />} />
            <Route path="/portfolio" element={<PortfolioPage data={siteData} />} />
            <Route path="/contact" element={<ContactPage data={siteData} />} />
            <Route 
              path="/admin" 
              element={
                <AdminDashboard 
                  data={siteData} 
                  setData={updateSiteData} 
                  isAuthenticated={isAdmin}
                  setAuth={setIsAdmin}
                />
              } 
            />
          </Routes>
        </main>

        {!isAdmin && <Footer data={siteData} />}
      </div>
    </Router>
  );
};

export default App;

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
      if (!saved || saved === 'undefined' || saved === 'null') return INITIAL_DATA;
      
      const parsed = JSON.parse(saved);
      // 필수 데이터 구조가 올바른지 확인
      if (!parsed || typeof parsed !== 'object' || !parsed.config || !parsed.services || !parsed.portfolio) {
        return INITIAL_DATA;
      }
      return parsed;
    } catch (e) {
      console.error("Failed to load site data:", e);
      return INITIAL_DATA;
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (siteData) {
      localStorage.setItem('injung_site_data', JSON.stringify(siteData));
    }
  }, [siteData]);

  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
  };

  // 데이터 가드: 필수 데이터가 없을 경우 로딩 화면 표시
  if (!siteData || !siteData.config) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">인정E&C 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white selection:bg-purple-500 selection:text-white">
        <Navbar 
          siteName={siteData.config.companyName || "인정E&C"} 
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
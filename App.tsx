
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
  // 상태 초기화 시 로컬 스토리지 데이터를 매우 보수적으로 확인
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('injung_site_data');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        // 필수 필드(config, services, portfolio)가 모두 존재하는지 검증
        if (parsed && parsed.config && Array.isArray(parsed.services) && Array.isArray(parsed.portfolio)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Local storage data invalid, falling back to INITIAL_DATA.");
    }
    return INITIAL_DATA;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // 데이터 변경될 때만 로컬 스토리지 업데이트
  useEffect(() => {
    if (siteData) {
      localStorage.setItem('injung_site_data', JSON.stringify(siteData));
    }
  }, [siteData]);

  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white selection:bg-purple-500 selection:text-white">
        <Navbar 
          siteName={siteData?.config?.companyName || "인정E&C"} 
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
            {/* 404 발생 시 홈으로 리다이렉트 (안전 장치) */}
            <Route path="*" element={<HomePage data={siteData} />} />
          </Routes>
        </main>

        {!isAdmin && <Footer data={siteData} />}
      </div>
    </Router>
  );
};

export default App;


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
  // 상태 초기화 로직 최적화
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('injung_site_data');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        // 데이터 구조 검증
        if (parsed && parsed.config && Array.isArray(parsed.services)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Storage data corrupted, using defaults:", e);
    }
    return INITIAL_DATA;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // 데이터가 변경될 때만 로컬 스토리지에 저장
  useEffect(() => {
    try {
      if (siteData) {
        localStorage.setItem('injung_site_data', JSON.stringify(siteData));
      }
    } catch (e) {
      console.error("Failed to persist data:", e);
    }
  }, [siteData]);

  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
  };

  // 렌더링 시 siteData 가 존재하지 않을 경우를 대비한 최소한의 가드
  if (!siteData || !siteData.config) {
    return <div className="bg-black min-h-screen"></div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white selection:bg-purple-500 selection:text-white animate-fade-in">
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
            {/* Catch-all route to home */}
            <Route path="*" element={<HomePage data={siteData} />} />
          </Routes>
        </main>

        {!isAdmin && <Footer data={siteData} />}
      </div>
    </Router>
  );
};

export default App;

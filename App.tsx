
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
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem('injung_site_data');
        if (!saved || saved === 'undefined' || saved === 'null') {
          setSiteData(INITIAL_DATA);
          return;
        }
        
        const parsed = JSON.parse(saved);
        // 필수 필드가 모두 있는지 엄격하게 검사
        if (
          parsed && 
          parsed.config && 
          parsed.config.slogan && 
          Array.isArray(parsed.services) && 
          Array.isArray(parsed.portfolio)
        ) {
          setSiteData(parsed);
        } else {
          // 구조가 다르면 초기화
          setSiteData(INITIAL_DATA);
        }
      } catch (e) {
        console.error("데이터 로드 중 오류 발생:", e);
        setSiteData(INITIAL_DATA);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (siteData) {
      localStorage.setItem('injung_site_data', JSON.stringify(siteData));
    }
  }, [siteData]);

  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
  };

  // 데이터 로딩 중이거나 필수 데이터가 없는 경우의 로딩 화면
  if (!siteData || !siteData.config) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white text-center p-6">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold mb-2">인정E&C</h2>
        <p className="text-gray-500">최상의 위생 솔루션을 불러오는 중입니다...</p>
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

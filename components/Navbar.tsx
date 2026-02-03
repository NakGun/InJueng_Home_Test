
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, LogOut } from 'lucide-react';

interface NavbarProps {
  siteName: string;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ siteName, isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '홈', path: '/' },
    { name: '인정E&C 소개', path: '/about' },
    { name: '서비스 안내', path: '/services' },
    { name: '시공 사례', path: '/portfolio' },
    { name: '견적 문의', path: '/contact' },
  ];

  if (isAdmin) {
    return (
      <nav className="sticky top-0 z-50 bg-neutral-900 border-b border-purple-900/30 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-purple-500">INJUNG</span>
          <span className="text-sm bg-purple-500/20 px-2 py-0.5 rounded text-purple-400">ADMIN</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/admin" className="text-sm text-gray-400 hover:text-white">대시보드</Link>
          <button 
            onClick={() => setIsAdmin(false)}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
          >
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center">
          <span className="purple-gradient-text">{siteName}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${location.pathname === item.path ? 'text-purple-400' : 'text-gray-300'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 purple-glow"
          >
            빠른 견적
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[64px] bg-black/95 z-40 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col items-center pt-20 gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light hover:text-purple-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/admin" 
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-500 mt-10"
            >
              관리자 로그인
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

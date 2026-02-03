
import React from 'react';
import { SiteData } from '../types';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC<{ data: SiteData }> = ({ data }) => {
  const { config } = data;
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black mb-6 purple-gradient-text">{config.companyName}</h2>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              {config.slogan}. 인정E&C는 최첨단 장비와 전문가의 노하우로 최상의 공간 위생 환경을 제공합니다.
            </p>
            <div className="flex gap-4">
              <a href={config.instagram} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-purple-600/20 transition-colors">
                <Instagram size={20} />
              </a>
              <a href={`tel:${config.phone}`} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-purple-600/20 transition-colors">
                <Phone size={20} />
              </a>
              <a href={config.blog} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-purple-600/20 transition-colors">
                <span className="font-bold text-xs">BLOG</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">바로가기</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">회사 소개</Link></li>
              <li><Link to="/services" className="hover:text-purple-400 transition-colors">서비스 안내</Link></li>
              <li><Link to="/portfolio" className="hover:text-purple-400 transition-colors">시공 사례</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition-colors">견적 문의</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">고객 센터</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-purple-500 mt-1 shrink-0" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-purple-500 mt-1 shrink-0" />
                <span>{config.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-purple-500 mt-1 shrink-0" />
                <span>{config.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 {config.companyName}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/admin" className="hover:text-white transition-colors">관리자 모드</Link>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { SiteData } from '../types.ts';
import { CheckCircle2 } from 'lucide-react';

const ServicesPage: React.FC<{ data: SiteData }> = ({ data }) => {
  const { services } = data;
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-purple-500 font-bold tracking-widest uppercase mb-4">Our Expertise</h2>
          <h1 className="text-5xl md:text-6xl font-black mb-10 leading-tight">전문적인 위생 솔루션</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            인정E&C는 에어컨 정밀 세척부터 상업 시설의 정기 관리까지,<br/>각 공간에 최적화된 맞춤형 솔루션을 제안합니다.
          </p>
        </div>

        <div className="space-y-32">
          {services.map((service, idx) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 relative group">
                <div className="absolute -inset-4 bg-purple-600/10 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={service.imageUrl} 
                  className="relative rounded-[40px] border border-white/10 shadow-2xl w-full h-[500px] object-cover"
                  alt={service.title}
                />
              </div>
              <div className="flex-1">
                <span className="text-purple-500 font-black text-8xl opacity-10 mb-[-20px] block">0{idx + 1}</span>
                <h3 className="text-4xl font-black mb-8">{service.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed mb-10">{service.description}</p>
                <ul className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-gray-300 font-medium">인정E&C만의 독자적인 위생 관리 매뉴얼 적용</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <a href="#/contact" className="bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all inline-block">견적 상담 요청</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

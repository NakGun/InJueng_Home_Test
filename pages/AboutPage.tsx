
import React from 'react';
import { SiteData } from '../types';

const AboutPage: React.FC<{ data: SiteData }> = ({ data }) => {
  const { config } = data;
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-purple-500 font-bold tracking-widest uppercase mb-4">About Us</h2>
          <h1 className="text-5xl md:text-7xl font-black mb-10 leading-tight">정직한 기술로<br/>공간을 변화시킵니다</h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1600880210839-2f68e98728aa?q=80&w=2070&auto=format&fit=crop" 
              className="rounded-3xl border border-white/10 relative z-10"
              alt="Team"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-8">인정E&C 브랜드 스토리</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {config.companyName}는 단순한 '청소'를 넘어 공간의 가치를 복원하고 건강한 환경을 디자인한다는 사명감으로 시작되었습니다. 우리는 보이지 않는 곳의 위생이 삶의 질과 비즈니스의 품격을 결정한다고 믿습니다.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              수년간의 노하우를 바탕으로 에어컨 정밀 세척부터 빌딩 전체 위생 관리까지, 체계적이고 전문적인 솔루션을 제공하며 업계에서 그 기술력을 '인정'받고 있습니다.
            </p>
          </div>
        </div>

        <div className="glass rounded-[40px] p-12 md:p-20 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />
          <h3 className="text-3xl font-bold mb-16 text-center">회사 연혁</h3>
          <div className="max-w-3xl mx-auto">
            {config.history.map((item, i) => (
              <div key={i} className="flex gap-8 md:gap-16 mb-12 last:mb-0 relative group">
                <div className="w-24 md:w-32 text-right">
                  <span className="text-2xl font-black purple-gradient-text">{item.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 relative z-10 ring-4 ring-purple-500/20" />
                  {i !== config.history.length - 1 && <div className="w-0.5 h-full bg-white/10 mt-2" />}
                </div>
                <div className="flex-1 pb-12">
                  <p className="text-xl font-bold group-hover:text-purple-400 transition-colors">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

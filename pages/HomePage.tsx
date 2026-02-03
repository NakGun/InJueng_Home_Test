
import React from 'react';
import { SiteData } from '../types';
import { ChevronRight, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC<{ data: SiteData }> = ({ data }) => {
  const { config, services, portfolio } = data;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30 scale-105"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass border-purple-500/30 text-purple-400 text-xs font-bold tracking-widest uppercase">
            Premium Cleaning Solution
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
            {config.slogan.split(' ').map((word, i) => (
              <span key={i} className={i >= 2 ? 'purple-gradient-text block md:inline' : 'block md:inline'}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            인정E&C는 최상의 기술력과 정직함으로 당신의 비즈니스와 생활 공간을 쾌적하게 디자인합니다.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 purple-glow">
              무료 견적 받기 <ChevronRight size={20} />
            </Link>
            <Link to="/portfolio" className="glass hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg transition-all border-white/20">
              시공 사례 보기
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">OUR SERVICES</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full mb-8" />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              인정E&C가 제공하는 전문적이고 체계적인 위생 관리 솔루션입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={service.id} className="group relative overflow-hidden rounded-3xl glass border-white/5 h-[450px]">
                <img 
                  src={service.imageUrl} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40"
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 p-10">
                  <span className="text-purple-500 font-black text-6xl opacity-10 absolute top-[-20px] left-8">0{idx + 1}</span>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">{service.description}</p>
                  <Link to="/services" className="flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors">
                    상세보기 <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                우리가 <span className="purple-gradient-text">인정</span>받는 이유
              </h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl glass flex items-center justify-center text-purple-500 border-purple-500/20">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">철저한 사후 관리</h4>
                    <p className="text-gray-400 leading-relaxed">시공 후 발생하는 모든 문제에 대해 끝까지 책임지고 신속하게 대응합니다.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl glass flex items-center justify-center text-purple-500 border-purple-500/20">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">최첨단 정밀 장비</h4>
                    <p className="text-gray-400 leading-relaxed">눈에 보이지 않는 오염까지 완벽하게 제거하기 위해 고성능 정밀 장비를 운용합니다.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl glass flex items-center justify-center text-purple-500 border-purple-500/20">
                    <Award size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">전문 자격 기술진</h4>
                    <p className="text-gray-400 leading-relaxed">다년간의 현장 경험과 전문 자격을 보유한 베테랑들이 직접 시공합니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-purple-600/20 rounded-[40px] blur-2xl group-hover:bg-purple-600/30 transition-all" />
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=2070&auto=format&fit=crop" 
                className="relative rounded-[40px] border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                alt="Pro Service"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6">SUCCESSFUL STORIES</h2>
              <p className="text-gray-400 text-lg">결과로 증명하는 인정E&C의 프리미엄 포트폴리오</p>
            </div>
            <Link to="/portfolio" className="text-purple-400 flex items-center gap-2 font-bold group">
              전체 보기 <ArrowRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.slice(0, 3).map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 border border-white/5">
                  <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">자세히 보기</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="glass px-3 py-1 rounded-md text-xs font-bold text-purple-400">{item.category}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.client} | {item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

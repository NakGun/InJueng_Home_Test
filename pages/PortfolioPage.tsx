
import React, { useState } from 'react';
import { SiteData } from '../types.ts';

const PortfolioPage: React.FC<{ data: SiteData }> = ({ data }) => {
  const { portfolio } = data;
  const categories = ["전체", ...Array.from(new Set(portfolio.map(p => p.category)))];
  const [activeTab, setActiveTab] = useState("전체");

  const filteredItems = activeTab === "전체" 
    ? portfolio 
    : portfolio.filter(p => p.category === activeTab);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <h2 className="text-purple-500 font-bold tracking-widest uppercase mb-4">Portfolio</h2>
            <h1 className="text-5xl font-black">시공 사례</h1>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === cat ? 'bg-purple-600 text-white' : 'glass text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item) => (
            <div key={item.id} className="group animate-in fade-in zoom-in duration-500">
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 border border-white/5">
                <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-6 left-6">
                  <span className="glass px-4 py-1.5 rounded-xl text-xs font-bold text-purple-400 border-purple-500/30">{item.category}</span>
                </div>
              </div>
              <div>
                <span className="text-purple-400 text-xs font-bold mb-2 block">{item.date}</span>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <p className="text-gray-500 font-medium">{item.client}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-gray-500 text-xl font-light">해당 카테고리의 사례가 아직 등록되지 않았습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;

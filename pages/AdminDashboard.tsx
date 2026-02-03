
import React, { useState } from 'react';
import { SiteData, PortfolioItem } from '../types.ts';
import { 
  LayoutDashboard, Image as ImageIcon, Settings, Save, 
  Trash2, Plus, LogIn, ChevronRight, BarChart, Users, MessageSquare,
  Edit2, CloudUpload, Loader2
} from 'lucide-react';

interface AdminProps {
  data: SiteData;
  setData: (data: SiteData) => void;
  isAuthenticated: boolean;
  setAuth: (val: boolean) => void;
}

const AdminDashboard: React.FC<AdminProps> = ({ data, setData, isAuthenticated, setAuth }) => {
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'settings'>('overview');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuth(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    setData({ ...data });

    try {
      await fetch('https://formspree.io/f/xaqbkqzw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[인정E&C 설정 백업] ${new Date().toLocaleString()}`,
          _source: 'Admin Dashboard Backup',
          siteConfig: data.config,
          portfolioCount: data.portfolio.length,
          timestamp: new Date().toISOString()
        })
      });
      alert('설정이 로컬에 저장되었으며, Formspree로 백업 스냅샷이 전송되었습니다.');
    } catch (error) {
      console.warn('Backup failed, but local save succeeded:', error);
      alert('설정이 로컬에만 저장되었습니다. (백업 전송 실패)');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeletePortfolio = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setData({
        ...data,
        portfolio: data.portfolio.filter(p => p.id !== id)
      });
    }
  };

  const handleAddPortfolio = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: "새로운 시공 사례",
      client: "고객사명",
      date: new Date().toISOString().slice(0, 7).replace('-', '.'),
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      category: "에어컨 세척"
    };
    setData({
      ...data,
      portfolio: [newItem, ...data.portfolio]
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">
        <div className="max-w-md w-full glass p-10 rounded-[40px] border-white/5 text-center">
          <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <LayoutDashboard className="text-purple-500" size={40} />
          </div>
          <h1 className="text-3xl font-black mb-2">관리자 로그인</h1>
          <p className="text-gray-500 mb-10 text-sm">인정E&C 사이트 관리 시스템입니다.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="관리자 암호 (admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500 transition-all text-center"
            />
            <button className="w-full bg-purple-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-all purple-glow">
              <LogIn size={20} /> 접속하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <aside className="w-72 border-r border-white/5 hidden md:block pt-10 px-6">
        <div className="space-y-4">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'overview' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <BarChart size={20} /> <span className="font-bold">현황 대시보드</span>
          </button>
          <button onClick={() => setActiveTab('portfolio')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'portfolio' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <ImageIcon size={20} /> <span className="font-bold">포트폴리오 관리</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Settings size={20} /> <span className="font-bold">사이트 기본 설정</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black">대시보드 개요</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-3xl border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500"><ImageIcon size={24}/></div>
                  <span className="text-green-500 text-xs font-bold">Live</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">총 시공 사례</p>
                <p className="text-4xl font-black">{data.portfolio.length}건</p>
              </div>
              <div className="glass p-8 rounded-3xl border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500"><Users size={24}/></div>
                  <span className="text-blue-500 text-xs font-bold">+12%</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">월간 방문자</p>
                <p className="text-4xl font-black">1,248명</p>
              </div>
              <div className="glass p-8 rounded-3xl border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500"><MessageSquare size={24}/></div>
                  <span className="text-orange-500 text-xs font-bold">New</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">견적 문의 수신처</p>
                <p className="text-lg font-bold truncate">Formspree 연동중</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black">포트폴리오 관리</h2>
              <button onClick={handleAddPortfolio} className="bg-purple-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 transition-all">
                <Plus size={20} /> 새 시공 등록
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {data.portfolio.map((item) => (
                <div key={item.id} className="glass p-6 rounded-3xl border-white/5 flex items-center gap-8">
                  <img src={item.imageUrl} className="w-32 h-24 object-cover rounded-xl" alt={item.title} />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.category} | {item.client}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 glass rounded-xl text-gray-400 hover:text-white transition-all"><Edit2 size={18} /></button>
                    <button onClick={() => handleDeletePortfolio(item.id)} className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black">사이트 기본 설정</h2>
            <form onSubmit={handleSaveConfig} className="glass rounded-[40px] p-10 border-white/5 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">회사명</label>
                  <input type="text" value={data.config.companyName} onChange={(e) => setData({...data, config: {...data.config, companyName: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">전화번호</label>
                  <input type="text" value={data.config.phone} onChange={(e) => setData({...data, config: {...data.config, phone: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500" />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-sm font-bold text-gray-500">메인 슬로건</label>
                  <input type="text" value={data.config.slogan} onChange={(e) => setData({...data, config: {...data.config, slogan: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500" />
                </div>
              </div>
              <button type="submit" disabled={isSyncing} className="bg-purple-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-purple-700 transition-all purple-glow flex items-center gap-3 disabled:opacity-50">
                {isSyncing ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                데이터 저장 및 클라우드 백업
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

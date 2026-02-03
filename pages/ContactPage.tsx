
import React, { useState } from 'react';
import { SiteData } from '../types.ts';
import { Phone, Mail, MapPin, Send, Instagram, ExternalLink, Loader2 } from 'lucide-react';

const ContactPage: React.FC<{ data: SiteData }> = ({ data }) => {
  const { config } = data;
  const [formState, setFormState] = useState({ name: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xaqbkqzw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formState,
          _subject: `[인정E&C 견적문의] ${formState.name}님 - ${formState.service}`,
          _source: 'Contact Page'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', phone: '', service: '', message: '' });
      } else {
        const errorData = await response.json();
        alert(errorData.error || '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('서버와 통신 중 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-purple-500 font-bold tracking-widest uppercase mb-4">Contact Us</h2>
          <h1 className="text-5xl font-black mb-6">견적 및 서비스 문의</h1>
          <p className="text-gray-400 text-lg">상담은 무료이며, 언제나 친절하고 신속하게 답변해 드립니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="glass rounded-[40px] p-10 border-white/5">
              <h3 className="text-2xl font-bold mb-10">연락처 정보</h3>
              <div className="space-y-8">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1 font-medium">전화 상담</p>
                    <p className="text-xl font-bold">{config.phone}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1 font-medium">이메일 문의</p>
                    <p className="text-xl font-bold">{config.email}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1 font-medium">본사 위치</p>
                    <p className="text-lg font-bold">{config.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5 flex gap-4">
                <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 glass py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors">
                  <Instagram size={20} /> <span className="font-bold text-sm">Instagram</span>
                </a>
                <a href={config.blog} target="_blank" rel="noopener noreferrer" className="flex-1 glass py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors">
                  <span className="font-bold text-sm">Official Blog</span> <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="h-[400px] glass rounded-[40px] border-white/5 relative overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                alt="Map Placeholder"
              />
              <div className="relative z-10 text-center px-10">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 purple-glow">
                  <MapPin size={32} />
                </div>
                <p className="font-bold mb-2">건물 위생 전문 솔루션</p>
                <p className="text-sm text-gray-400">{config.address}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-[40px] p-10 md:p-14 border-white/5">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in scale-in">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-4">문의가 접수되었습니다!</h3>
                <p className="text-gray-400 text-lg mb-10">빠른 시일 내에 전문가가 연락드리겠습니다.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-purple-600 px-10 py-4 rounded-full font-bold hover:bg-purple-700 transition-all"
                >
                  추가 문의하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <h3 className="text-2xl font-bold mb-4">문의 양식 작성</h3>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">성함 / 업체명</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="홍길동"
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">연락처</label>
                  <input 
                    required
                    name="phone"
                    type="tel" 
                    value={formState.phone}
                    onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    placeholder="010-0000-0000"
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">문의 서비스</label>
                  <select 
                    name="service"
                    value={formState.service}
                    onChange={(e) => setFormState({...formState, service: e.target.value})}
                    disabled={isSubmitting}
                    className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50"
                  >
                    <option value="">서비스 선택</option>
                    <option value="프리미엄 에어컨 세척">프리미엄 에어컨 세척</option>
                    <option value="빌딩 외벽 클리닝">빌딩 외벽 클리닝</option>
                    <option value="상업 공간 정기 관리">상업 공간 정기 관리</option>
                    <option value="기타 위생 문의">기타 위생 문의</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">문의 내용</label>
                  <textarea 
                    name="message"
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder="상세 내용을 입력해주세요 (현장 위치, 수량 등)"
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500 transition-all resize-none disabled:opacity-50"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 py-5 rounded-2xl font-black text-xl hover:bg-purple-700 transition-all purple-glow flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>전송 중... <Loader2 size={24} className="animate-spin" /></>
                  ) : (
                    <>견적 요청하기 <Send size={24} /></>
                  )}
                </button>
                <p className="text-center text-xs text-gray-500">지정하신 Formspree를 통해 안전하게 수집됩니다.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

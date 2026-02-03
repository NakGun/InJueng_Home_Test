
import { SiteData } from './types.ts';

export const INITIAL_DATA: SiteData = {
  config: {
    companyName: "인정E&C",
    slogan: "공간의 가치를 더하는 전문 위생 솔루션",
    phone: "010-3657-0526",
    email: "ijeng725@gmail.com",
    address: "경기도 성남시 중원구 산성대로 106, 3층 A389호",
    instagram: "https://instagram.com/injung_enc",
    blog: "https://blog.naver.com/injung_enc",
    history: [
      { year: "2023", event: "인정E&C 설립 및 사업 개시" },
      { year: "2024", event: "에어컨 정밀 세척 특허 기술 도입" },
      { year: "2025", event: "빌딩 위생 관리 전문 면허 취득" },
      { year: "2026", event: "프리미엄 상업 공간 연간 관리 500개소 달성" }
    ]
  },
  services: [
    {
      id: "s1",
      title: "프리미엄 에어컨 분해 세척",
      description: "천장형 시스템 에어컨을 완벽하게 분해하여, 전문 엔지니어가 고압 세척 장비로 내부 오염과 곰팡이를 99.9% 제거합니다.",
      icon: "Wind",
      imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop",
      features: [
        "안전모와 장구를 착용한 전문 기술진의 정밀 분해 시공",
        "천장형 에어컨 전용 고압 세척 및 열교환기 살균",
        "시공 후 성능 테스트 및 친환경 살균 코팅 마무리"
      ]
    },
    {
      id: "s2",
      title: "빌딩 로비 및 계단 위생 관리",
      description: "고성능 바닥 연마기 및 광택 장비를 사용하여 대리석과 석재 로비의 품격을 되살리고 청결을 장기간 유지합니다.",
      icon: "Building",
      imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=2070&auto=format&fit=crop",
      features: [
        "로비 대리석 전용 연마 광택 및 스크래치 제거",
        "보행량이 많은 계단실의 묵은 때 완벽 제거",
        "전문 인력과 장비를 동원한 정기적인 위생 케어"
      ]
    },
    {
      id: "s3",
      title: "사무실/상가 정기 관리",
      description: "업무 효율을 높이는 쾌적한 비즈니스 환경을 위해 공간별 맞춤 클리닝 매뉴얼을 적용하여 정기적으로 관리합니다.",
      icon: "ShieldCheck",
      imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070&auto=format&fit=crop",
      features: [
        "전담 관리팀 구성을 통한 책임 위생 관리",
        "사무 공간 및 편의 시설 특화 위생 솔루션",
        "야간/주말 맞춤 시공으로 업무 방해 최소화"
      ]
    }
  ],
  portfolio: [
    {
      id: "p1",
      title: "강남 S-Tower 시스템 에어컨 세척",
      client: "S-Tower 관리소",
      date: "2024.03",
      imageUrl: "https://images.unsplash.com/photo-1621905252507-b352220730b8?q=80&w=2069&auto=format&fit=crop",
      category: "에어컨 세척"
    },
    {
      id: "p2",
      title: "판교 IT밸리 로비 대리석 광택 시공",
      client: "하이테크 빌딩",
      date: "2024.02",
      imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2070&auto=format&fit=crop",
      category: "내부 클리닝"
    },
    {
      id: "p3",
      title: "종로 비즈니스 센터 정기 위생 관리",
      client: "J-Business Center",
      date: "2024.01",
      imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2074&auto=format&fit=crop",
      category: "정기 관리"
    }
  ]
};


import { SiteData } from './types';

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
      { year: "2018", event: "인정E&C 설립 및 사업 개시" },
      { year: "2019", event: "에어컨 정밀 세척 특허 기술 도입" },
      { year: "2021", event: "빌딩 위생 관리 전문 면허 취득" },
      { year: "2023", event: "프리미엄 상업 공간 연간 관리 500개소 달성" }
    ]
  },
  services: [
    {
      id: "s1",
      title: "프리미엄 에어컨 세척",
      description: "최첨단 장비를 활용한 완전 분해 정밀 세척으로 공기의 질을 개선합니다.",
      icon: "Wind",
      imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7e8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "s2",
      title: "빌딩 외벽 및 창호 청소",
      description: "건물의 가치를 높이는 전문 외벽 세척 및 고층 유리창 정밀 클리닝 서비스입니다.",
      icon: "Building",
      imageUrl: "https://images.unsplash.com/photo-1545458852-21169c957bb5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "s3",
      title: "사무실/상가 정기 관리",
      description: "비즈니스 환경에 최적화된 맞춤형 정기 위생 관리 프로그램으로 쾌적함을 유지합니다.",
      icon: "ShieldCheck",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    }
  ],
  portfolio: [
    {
      id: "p1",
      title: "강남 S타워 전층 에어컨 정밀 세척",
      client: "S그룹 본사",
      date: "2024.03",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      category: "에어컨 세척"
    },
    {
      id: "p2",
      title: "성수동 럭셔리 쇼룸 외벽 클리닝",
      client: "M 디자인 하우스",
      date: "2024.02",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
      category: "건물 외벽"
    },
    {
      id: "p3",
      title: "판교 IT 밸리 사무실 정기 위생 관리",
      client: "T 테크놀로지",
      date: "2024.01",
      imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
      category: "정기 관리"
    }
  ]
};

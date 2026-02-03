
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface SiteConfig {
  companyName: string;
  slogan: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  blog: string;
  history: { year: string; event: string }[];
}

export interface SiteData {
  config: SiteConfig;
  services: Service[];
  portfolio: PortfolioItem[];
}

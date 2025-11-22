

export enum ServerProtocol {
  VMESS = 'VMESS',
  WIREGUARD = 'WIREGUARD',
  OPENVPN_TCP = 'OPENVPN TCP',
  OPENVPN_UDP = 'OPENVPN UDP',
  IPSEC_EAP = 'IPSEC EAP',
  IPSEC_PSK = 'IPSEC PSK',
}

export interface Server {
  id: string;
  countryCode: string;
  countryName: string;
  protocol: ServerProtocol;
  serverIp: string;
  provideTo: 'Free' | 'Premium';
  remoteId?: string;
  localId?: string;
  secretKey?: string;
  latitude: number;
  longitude: number;
}

export enum SubscriptionType {
  FREE = 'Free',
  PREMIUM = 'Premium',
}

export interface Subscription {
  id: string;
  name: string;
  type: SubscriptionType;
  price?: number;
  paymentApi?: string; // Bank or PayPal API
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptionId: string;
  bandwidthUsage: number; // in GB
  dataUsage: number; // in GB
}

export interface AppSettings {
  adMobId: string;
  rewardId: string;
  androidLink: string;
  iosLink: string;
  desktopLink: string;
  macOsLink: string;
  logoUrl: string;
  bannerUrl: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Feedback {
  id: string;
  userId: string;
  message: string;
  rating: number; // e.g., 1-5 stars
  timestamp: number; // Unix timestamp
}

export interface AppData {
  users: User[];
  servers: Server[];
  subscriptions: Subscription[];
  settings: AppSettings;
  faq: FAQ[];
  feedback: Feedback[];
  banners: Banner[]; // Fix: Added 'banners' property to AppData interface
  termsAndConditions: string;
  privacyPolicy: string;
  eula: string;
  securityNotes: string; // Placeholder for security related info
}
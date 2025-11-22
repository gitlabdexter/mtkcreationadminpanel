
import { AppData, ServerProtocol, SubscriptionType } from './types';

export const INITIAL_DATA: AppData = {
  users: [
    { id: 'user-1', name: 'John Doe', email: 'john@example.com', subscriptionId: 'sub-1', bandwidthUsage: 150, dataUsage: 50 },
    { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com', subscriptionId: 'sub-1', bandwidthUsage: 250, dataUsage: 80 },
    { id: 'user-3', name: 'CV Creation User', email: 'cvcreation@example.com', subscriptionId: 'sub-2', bandwidthUsage: 500, dataUsage: 200 },
  ],
  servers: [
    { id: 'server-1', countryCode: 'US', countryName: 'United States', protocol: ServerProtocol.WIREGUARD, serverIp: '192.168.1.1', provideTo: 'Free', latitude: 38.9072, longitude: -77.0369 },
    { id: 'server-2', countryCode: 'DE', countryName: 'Germany', protocol: ServerProtocol.OPENVPN_TCP, serverIp: '10.8.0.1', provideTo: 'Premium', latitude: 52.5200, longitude: 13.4050 },
    { id: 'server-3', countryCode: 'JP', countryName: 'Japan', protocol: ServerProtocol.IPSEC_PSK, serverIp: '172.16.0.1', provideTo: 'Premium', remoteId: 'jp-remote', localId: 'jp-local', secretKey: 'supersecret', latitude: 35.6895, longitude: 139.6917 },
  ],
  subscriptions: [
    { id: 'sub-1', name: 'Free Tier', type: SubscriptionType.FREE },
    { id: 'sub-2', name: 'Premium Monthly', type: SubscriptionType.PREMIUM, price: 9.99, paymentApi: 'paypal-api-key-live' },
  ],
  settings: {
    adMobId: 'ca-app-pub-3940256099942544/6300978111',
    rewardId: 'ca-app-pub-3940256099942544/5224354917',
    androidLink: 'https://play.google.com',
    iosLink: 'https://www.apple.com/app-store/',
    desktopLink: '#',
    macOsLink: '#',
    logoUrl: '',
    bannerUrl: '',
  },
  faq: [
    { id: 'faq-1', question: 'How to connect?', answer: 'Simply tap the connect button on the main screen.' },
    { id: 'faq-2', question: 'What is a VPN?', answer: 'A Virtual Private Network (VPN) gives you online privacy and anonymity by creating a private network from a public internet connection.' },
    { id: 'faq-3', question: 'Is DX VPN free?', answer: 'We offer a free tier with limited features and premium plans for full access.' },
  ],
  feedback: [
    { id: 'fb-1', userId: 'user-1', message: 'Great app!', rating: 5, timestamp: Date.now() - 86400000 },
    { id: 'fb-2', userId: 'user-2', message: 'Connection drops sometimes.', rating: 3, timestamp: Date.now() - 172800000 },
  ],
  banners: [
    { id: 'banner-1', imageUrl: 'https://via.placeholder.com/600x200?text=Premium+Ad+1', linkUrl: '#', isActive: true },
    { id: 'banner-2', imageUrl: 'https://via.placeholder.com/600x200?text=New+Feature+Promo', linkUrl: '#', isActive: false },
  ],
  termsAndConditions: `
    <h2>1. Introduction</h2>
    <p>Welcome to DX VPN! These Terms and Conditions ("Terms") govern your use of the DX VPN application and services. By accessing or using DX VPN, you agree to be bound by these Terms.</p>
    
    <h2>2. Services</h2>
    <p>DX VPN provides virtual private network services to enhance your online privacy and security. We strive to offer reliable service but cannot guarantee uninterrupted availability.</p>
    
    <h2>3. User Conduct</h2>
    <p>You agree not to use DX VPN for any unlawful or prohibited activities, including but not limited to, distributing malware, engaging in harassment, or violating intellectual property rights.</p>
    
    <h2>4. Privacy Policy</h2>
    <p>Your use of DX VPN is also governed by our Privacy Policy, which outlines how we collect, use, and protect your data.</p>
    
    <h2>5. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Your continued use of DX VPN after any such changes constitutes your acceptance of the new Terms.</p>
    
    <h2>6. Contact Us</h2>
    <p>If you have any questions about these Terms, please contact us at support@dxvpn.com.</p>
  `,
  privacyPolicy: `
    <h2>1. Introduction</h2>
    <p>Your privacy is paramount to DX VPN. This Privacy Policy explains what information we collect, how we use it, and your rights concerning your data.</p>

    <h2>2. Information We Collect</h2>
    <ul>
      <li><strong>Non-Personal Information:</strong> We may collect anonymized data such as app usage statistics, server connection times, and general location (country-level) to improve our services. This data cannot be used to identify you personally.</li>
      <li><strong>Account Information:</strong> If you create an account, we collect your email address and a hashed password. We do not store your original password.</li>
      <li><strong>Payment Information:</strong> For premium subscriptions, payment processing is handled by third-party providers (e.g., PayPal). We do not store your full payment card details.</li>
    </ul>

    <h2>3. How We Use Your Information</h2>
    <p>We use the collected information to:</p>
    <ul>
      <li>Provide and maintain our VPN service.</li>
      <li>Improve the app's performance and features.</li>
      <li>Process payments and manage subscriptions.</li>
      <li>Communicate with you regarding service updates or support.</li>
    </ul>

    <h2>4. Data Security</h2>
    <p>We implement robust security measures, including encryption and access controls, to protect your data from unauthorized access, alteration, disclosure, or destruction.</p>

    <h2>5. Changes to This Policy</h2>
    <p>We may update this Privacy Policy periodically. We will notify you of any significant changes by posting the new policy on our app or website.</p>
  `,
  eula: `
    <h2>1. Grant of License</h2>
    <p>This End-User License Agreement ("EULA") is a legal agreement between you and DX VPN for the use of the DX VPN software and services. By installing or using DX VPN, you agree to the terms of this EULA.</p>

    <h2>2. License Scope</h2>
    <p>DX VPN grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the DX VPN software solely for your personal, non-commercial purposes strictly in accordance with the terms of this EULA.</p>

    <h2>3. Restrictions</h2>
    <p>You agree not to, and you will not permit others to:</p>
    <ul>
      <li>License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose, or otherwise commercially exploit the Application or make the Application available to any third party.</li>
      <li>Modify, make derivative works of, disassemble, decrypt, reverse compile, or reverse engineer any part of the Application.</li>
      <li>Remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) of DX VPN or its affiliates, partners, suppliers, or the licensors of the Application.</li>
    </ul>

    <h2>4. Termination</h2>
    <p>This EULA will terminate immediately, without prior notice from DX VPN, if you fail to comply with any provision of this EULA.</p>

    <h2>5. No Warranties</h2>
    <p>The Application is provided to you "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.</p>
  `,
  securityNotes: `
    <h2>DX VPN Security Overview</h2>
    <p>At DX VPN, we prioritize your digital security and privacy. Here’s a brief overview of the measures we take:</p>
    
    <h3>Encryption Protocols</h3>
    <p>We utilize industry-standard encryption protocols (e.g., AES-256) to secure your data transmission. This ensures that your online activities are protected from eavesdropping and data interception.</p>
    
    <h3>No-Log Policy</h3>
    <p>DX VPN adheres to a strict no-log policy. We do not monitor, record, or store any information about your browsing history, traffic destination, data content, or DNS queries. Your online activities are your own business.</p>
    
    <h3>Secure Servers</h3>
    <p>Our global server network is designed with security in mind. Servers are hardened against vulnerabilities and are regularly updated to protect against the latest threats.</p>
    
    <h3>IP Masking</h3>
    <p>When you connect to DX VPN, your real IP address is hidden and replaced with one of our server's IP addresses. This makes it difficult for third parties to track your online identity and location.</p>
    
    <h3>DNS Leak Protection</h3>
    <p>We offer built-in DNS leak protection to ensure that your DNS requests are routed through the VPN tunnel, preventing your internet service provider (ISP) from seeing your browsing activity.</p>
    
    <h3>Regular Audits</h3>
    <p>Our systems undergo regular security audits and penetration testing to identify and address potential weaknesses, ensuring the highest level of protection for our users.</p>
  `,
};
    
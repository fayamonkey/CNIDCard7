// ClaudeNation Configuration File

export const APP_CONFIG = {
  name: 'ClaudeNation',
  version: '0.1.0',
  officialDomain: 'claudenation.org',
  contactEmail: 'citizenship@claudenation.org',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  metadataBaseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

export const ID_CARD_CONFIG = {
  designs: [
    {
      id: 1,
      name: 'Light Theme',
      backgroundUrl: '/backgrounds/claudenation01light.jpg',
      textColor: 'black',
    },
    {
      id: 2,
      name: 'Dark Theme',
      backgroundUrl: '/backgrounds/claudenation02dark.jpg',
      textColor: 'white',
    }
  ],
  validityYears: 5,
  defaultDesignId: 1,
};

export const AUTH_CONFIG = {
  loginUrl: '/login',
  registerUrl: '/register',
  callbackUrl: '/id-card',
  forgotPasswordUrl: '/forgot-password',
};

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  endpoints: {
    register: '/auth/register',
    login: '/auth/login',
    user: '/user',
    idCard: '/id-card',
    email: '/email',
  },
}; 
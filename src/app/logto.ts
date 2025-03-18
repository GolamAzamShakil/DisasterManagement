import { LogtoNextConfig } from '@logto/next';

export const logtoConfig: LogtoNextConfig = {
  appId: 'agangiba5qy5qmipgoet0',
  appSecret: 'au0DnFK7m9S4gKl9PYD58fECMsn37I0v',
  endpoint: 'https://f4x9q9.logto.app/', // E.g. http://localhost:3001
  baseUrl: 'http://localhost:3000', // E.g. http://localhost:3000
  cookieSecret: 'IDontKnowWhatShouldIUseInThisField',
  cookieSecure: process.env.NODE_ENV === 'production',
};
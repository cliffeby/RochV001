/**
 * Created by cliff on 8/27/2017.
 */
interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  'clientID': 'GeBq4QKhQbaWXmP8xNv9a4QjFRjCcsQn',
  'domain': 'rocheby.auth0.com',
  'callbackURL': 'http://localhost:4200/callback'
};

import matrixIcon from '../assets/matrix.svg';
import cinnyIcon from '../assets/cinny.svg';
import searxngIcon from '../assets/searxng.svg';
import vaultwardenIcon from '../assets/vaultwarden.svg';
import sendIcon from '../assets/send.svg';

export interface Instance {
  name: string;
  icon: string;
  url: string;
  redirectUrl?: string;
  healthUrl?: string;
}

export const instances: Instance[] = [
  {
    name: 'Matrix - Secure, decentralised communication',
    icon: matrixIcon,
    url: 'https://nylyk.com',
    redirectUrl: 'https://chat.nylyk.com',
    healthUrl: 'https://matrix.nylyk.com/_conduwuit/server_version',
  },
  {
    name: 'Cinny - Simple, elegant and secure matrix client',
    icon: cinnyIcon,
    url: 'https://chat.nylyk.com',
  },
  {
    name: 'SearXNG - private search engine',
    icon: searxngIcon,
    url: 'https://search.nylyk.com',
    healthUrl: 'https://search.nylyk.com/healthz',
  },
  {
    name: 'Vaultwarden - secure password manager',
    icon: vaultwardenIcon,
    url: 'https://vault.nylyk.com',
    healthUrl: 'https://vault.nylyk.com/alive',
  },
  {
    name: 'Send - encrypted file sharing',
    icon: sendIcon,
    url: 'https://send.nylyk.com',
    healthUrl: 'https://send.nylyk.com/__heartbeat__',
  },
];

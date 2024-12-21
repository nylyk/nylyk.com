import searxngIcon from '../assets/searxng.svg';
import vaultwardenIcon from '../assets/vaultwarden.svg';
import sendIcon from '../assets/send.svg';

export interface Instance {
  name: string;
  icon: string;
  url: string;
}

export const instances: Instance[] = [
  {
    name: 'SearXNG - private search engine',
    icon: searxngIcon,
    url: 'https://search.nylyk.com',
  },
  {
    name: 'Vaultwarden - secure password manager',
    icon: vaultwardenIcon,
    url: 'https://vault.nylyk.com',
  },
  {
    name: 'Send - encrypted file sharing',
    icon: sendIcon,
    url: 'https://send.nylyk.com',
  },
];
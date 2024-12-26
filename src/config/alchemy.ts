import { Alchemy, Network } from 'alchemy-sdk';

if (!import.meta.env.VITE_ALCHEMY_API_KEY) {
  throw new Error('Missing Alchemy API key');
}

const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

console.log('Initializing Alchemy with network:', Network.ETH_MAINNET);

export const alchemy = new Alchemy(settings);
import { avalanche, avalancheFuji } from 'thirdweb/chains';

/**
 * Avalanche Testnet (Fuji) - for development
 * Pre-configured chain from thirdweb
 */
export const avalancheFujiTestnet = avalancheFuji;

/**
 * Avalanche Mainnet - for production
 * Pre-configured chain from thirdweb
 */
export const avalancheMainnet = avalanche;

// Use testnet for development
export const activeChain = avalancheFujiTestnet;


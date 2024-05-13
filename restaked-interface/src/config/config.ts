import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { createPublicClient } from "viem";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

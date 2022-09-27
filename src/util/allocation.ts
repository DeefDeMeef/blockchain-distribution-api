import Web3 from 'web3';
import { NetworkProvider } from '../types/enums';
import { TESTNET_RPC, RPC } from '@/config/secrets';
import { getContractConfig } from '@/config/contracts';
import { AbiItem } from 'web3-utils';
import { ContractName, currentVersion } from '@thxnetwork/artifacts';
// Hier kan je imports en rquires doen

// Hier kan je de abi van allocations zetten
const artifact: any = [{}]

const Allocations = async (npid: NetworkProvider, address?: string) => {
    const testnet = new Web3(TESTNET_RPC);
    const testnetAdmin = testnet.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    testnet.eth.defaultAccount = testnetAdmin.address;

    const mainnet = new Web3(RPC);
    const mainnetAdmin = mainnet.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    mainnet.eth.defaultAccount = mainnetAdmin.address;

    const getProvider = (npid: NetworkProvider) => {
        switch (npid) {
            default:
            case NetworkProvider.Test:
                return { web3: testnet, admin: testnetAdmin };
            case NetworkProvider.Main:
                return { web3: mainnet, admin: mainnetAdmin };
        }
    };
  const { web3 } = getProvider(npid);
  
    // Hier kan je in schrijven voor functie
  
    console.log('Dit werkt in allocations', address);

  let contract = await new web3.eth.Contract(artifact as AbiItem[], address);
  
        if (contract == null) {
            console.error('No contract found');
            return;
        } else {
            console.log('contract found');
        }
};

export default Allocations;

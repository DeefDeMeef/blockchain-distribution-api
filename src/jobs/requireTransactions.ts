import { getContractFromName, getProvider } from '../util/network';
import tokensLibrary from '../util/tokenLib.json';
import { fromWei, toWei } from 'web3-utils';
import { BigNumber } from 'ethers';

export async function jobProcessTransactions() {
    let feeCollectorAmount: any = [];

    // Function to collect the total amount of different tokens inside the feeCollector
    const getTotalFeeCollector = async () => {
        tokensLibrary.tokens.forEach(async (element, index) => {
            // Loop over every token and get balance
            let rewardToken = await getContractFromName(1, 'rewardToken', element.address);

            // Recieve balance of Tokentimelock contract
            let amount = await rewardToken.methods.balanceOf('0x3eF13AcF26776BfEd682732ae34cBC86bb355862').call();

            feeCollectorAmount.push({
                tokenAddress: element.address,
                amount: amount,
            });

            // Stop looping after every token is added to the feecollector
            if (index === tokensLibrary.tokens.length - 1) {
                calculation(feeCollectorAmount, '0x08302cf8648a961c607e3e7bd7b7ec3230c2a6c5');
            }
            return feeCollectorAmount;
        });
    };

    /**
     * @param feeCollectorAmount total amount of the current feeCollector
     * @param address address of user
     */
    interface collector {
        address: string;
        amount: any;
    }

    //Function to calculate rewards
    const calculation = async (feeCollectorAmount: Array<collector>, address?: string) => {
        const tokenTimeLock = await getContractFromName(
            1,
            'tokentimelock',
            '0x3eF13AcF26776BfEd682732ae34cBC86bb355862',
        );
        const UnlimitedSupplyToken = await getContractFromName(
            1,
            'UnlimitedSupplyToken',
            '0x8B219D3d1FC64e03F6cF3491E7C7A732bF253EC8',
        );

        try {
            // Recieve staked amount from smart contract
            let totaalStaked = await UnlimitedSupplyToken.methods.totalSupply().call();

            // Get user address
            const userAddress = await tokenTimeLock.methods.getAddress().call();

            userAddress.forEach(async (userAddress: string) => {
                // Loops through the addresses and extracts per address how much it has staked
                let stakedAmount = await UnlimitedSupplyToken.methods.balanceOf(userAddress).call();
                let pTotal = stakedAmount / totaalStaked;

                tokensLibrary.tokens.forEach(async (token: any, index: any) => {
                    // Calculates the percentage of its staked amount and multiplies the percentage per coin in the fee collector
                    let rewards = pTotal * feeCollectorAmount[index].amount;

                    // let allocation = await tokenTimeLock.methods.allocate(userAddress, token.address, rewards).send({
                    //     from: address,
                    // }).then(async () => {

                    // Send allocated rewards to user form payout function in TokenTimeLock contract
                    await tokenTimeLock.methods
                        .payout(userAddress, token.address, String(BigInt(rewards * 10)).slice(0, -1))
                        .send({
                            from: address,
                        });
                    //   return true
                    // });
                });
            });
        } catch (err) {
            throw new Error(err.message);
        }
    };

    // Calculate
    getTotalFeeCollector();

    console.log('Processing the job!');
}

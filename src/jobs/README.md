# THX API

This repository holds the code for the THX API project. A REST API that can be used to interact with the THX Smart Contract layer and whose main purpose is to make it easier for developers to utilize blockchain technology in their applications.

Our solution exists to let users stake without locking their funds. Users receive an alternative token in exchange, which they are able to trade. While their funds are locked, they receive rewards based on how much they have staked in the project. Users receive a certain percentage of fees collected by THX. These fees are distributed among the users.

##### Maintainers

[Almar Gemmel](mailto:Almar.gemmel@hva.nl)\
[Mert Gokseli](mailto:mert.gokseli@hva.nl)\
[Juriaan de Nijs](mailto:juriaan.de.nijs@hva.nl)\
[Davey Zaal](mailto:davey.zaal@hva.nl)\
[Daniël van Apeldoorn](mailto:daniel.van.apeldoorn@hva.nl)

## Index

1. getTotalFeeCollector
2. Calculation
3. Tokens

In our proof of concept, we had to simulate a situation where several users have staked THX and model the distributed rewards. We have several functions we would like to elaborate on. Our cronjob is written in /src/jobs/requireTransactions.ts. The frequency is defined in /src/util/agenda.ts.

### getTotalFeeCollector

getTotalFeeCollector is used for extracting the amount of coins that is in the fee collector. This function loops through the feecollector and extracts the coin address and the amount it has. This will be used for the calculation. We recieve the total balance by looking at the amount of tokens which are in Tokenlib.json and calling their balance. This is added to the fee collector, until we get all the balances.

### Calculation

The function calculation is used for calculating the rewards per user and allocating it. First the function loops through the addresses and extracts per address how much it has staked, then it extracts the total amount of staking. It calculates the percentage of its staked amount and multiplies the percentage per coin in the fee collector. The amount the address gets will be allocated and paid out immediately. Within the calculation function, the current total staked amount is received from the user.

### Tokens

Tokenlib.json is where we store our current fictional tokens. The format of these tokens are in json, so they can also be pulled from a database in the future.
rewardToken.json, tokentimelock.json and UnlimitedSupplyToken.json files are used for the ABI in requiredTransactions.ts. The ABI is used as an interface for the API for communicating with the smart contract.

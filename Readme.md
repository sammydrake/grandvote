_GrandVote Decentralized Blockchain Voting App_:
This is a decentralized blockchain voting app built using Solidity and the Ethereum blockchain. The app allows voters to cast their votes securely and transparently without the need for intermediaries such as election officials or third-party vote counters. The app is built on the Ethereum blockchain, which ensures that the results of the election are immutable and tamper-proof.

_Functios in the smart contact_:
The contract has the following functions:

A constructor to initialize the voting chairman address
A function to get the address of the voting chairman
A function to allow the voting chairman to transfer ownership of the contract
A function to add aspirants to the election
A function to register a voter by adding them to the enlistedVoters array and setting their 'isRegistered' flag to true
A function that allows a registered voter to cast their vote for a specific aspirant
A function that ends the voting process by setting the 'isVotingOpen' flag to false
A function that returns the timestamp for the start of the voting process
A function that returns the timestamp for the end of the voting process
A function that returns the number of aspirants added to the election
A function that returns the name and vote count of an aspirant with the given index
A function that returns the index of the aspirant that the given voter has voted for
A function that returns an array containing the addresses of all registered voters
The smart contract is written in Solidity and is compatible with version 0.8.0 or higher. It also includes a SPDX-License-Identifier to indicate that it is released under the MIT license.

_How it Works_:
The app consists of a smart contract written in Solidity, which is deployed on the Ethereum blockchain. The smart contract contains the rules and logic for conducting the election.

Voters can register themselves by enlisting their Ethereum addresses. After the voting period starts, they can cast their votes for the aspirants by calling the voteNow function and providing the index of the aspirant they want to vote for. Once the voting period ends, the endVoting function can be called by the voting chairman to stop the voting process.

The app allows the chairman to add aspirants to the election by calling the addAspirants function. The chairman can also transfer ownership of the contract by calling the grantOwnership function.

_Getting Started_:
To run the app, you need to have an Ethereum wallet such as MetaMask and an Ethereum network such as Mumbai.

Clone the repository:
git clone https://github.com/sammydrake/grandvote.git
cd grandvote
Install the required dependencies using npm install
Deploy the smart contract to the Ethereum network of your choice using a tool such as Remix or Hardhat(npx hardhat run scripts/deploy.js --network mumbai)
Copy the contract address and ABI into the contractAddress.js file.
Start the app using npm run dev

_live link_:
https://grandvote.vercel.app/

_Features_:
Secure and transparent voting process
Decentralized architecture eliminates the need for intermediaries
Immutable and tamper-proof results stored on the Ethereum blockchain
Future Improvements
Implement a user interface for the app to make it more user-friendly
Implement a better mechanism for verifying the identity of voters

_Contributions_:
Contributions to the project are welcome. If you find a bug or have a feature request, please create an issue on the GitHub repository. If you would like to contribute code, please create a pull request.

_License_:
The project is licensed under the MIT License. See LICENSE for more information.

_Credits_:
The app was built by me(Samson)

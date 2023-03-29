import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractAddress, electionABI } from "./contractAddress";

const getContract = (signerOrProvider) =>
  new ethers.Contract(contractAddress, electionABI, signerOrProvider);

const connectContract = async () => {
  const web3Modal = new Web3Modal();
  const connectivity = await web3Modal.connect();
  const node = new ethers.providers.Web3Provider(connectivity);
  const signer = node.getSigner();
  const contract = getContract(signer);
  return contract;
};

export const ContextElection = React.createContext();
export const ContextProvider = ({ children }) => {
  const router = useRouter();
  const [actualVoters, setActualVoters] = useState([]);
  const [walletAddr, setWalletAddr] = useState("");
  const [votingChairman, setVotingChairman] = useState("");

  useEffect(() => {
    walletConnected();
    trackWallet();
    getVotingChairman();
  }, []);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("WalletAddr", accounts[0]);
        console.log("ownerAddress", ownerAddress);
        setWalletAddr(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      // metamask is not installed.
      console.log("Kindly install metamask.");
    }
  };

  const walletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          console.log(accounts[0]);
          setWalletAddr(accounts[0]);
        } else console.log("Click on Connect button to connect your Metamask.");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Kindly install metamask.");
    }
  };

  const trackWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddr(accounts[0]);
          console.log(accounts[0]);
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setWalletAddr("");
      console.log("Kindly install metamask.");
    }
  };

  const getVotingChairman = async () => {
    try {
      const contract = await connectContract();
      let owner = await contract.getVotingChairman();
      setVotingChairman(owner);
    } catch (error) {}
  };

  const grantOwnership = async (address) => {
    try {
      const contract = await connectContract();
      await contract.grantOwnership(address);
      alert(`Ownership right succesfully transfered to:, ${address}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const aspirants = async (
    aspirantsName,
    votingCommenceTime,
    votingEndTime,
    minVotes
  ) => {
    console.log("aspirants   :   " + aspirantsName);
    const vst = new Date(votingCommenceTime);
    const vet = new Date(votingEndTime);
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);

    const startTimeStamp = Math.floor(vst.getTime() / 1000);
    const endTimeStamp = Math.floor(vet.getTime() / 1000);

    console.log(startTimeStamp);
    console.log(endTimeStamp);

    if (currentTimestampInSeconds < startTimeStamp) {
      try {
        const contract = await connectContract();
        await contract.addAspirants(
          aspirantsName,
          startTimeStamp,
          endTimeStamp,
          minVotes
        );
        alert("Kindly Hold On FOR TRANSACTION CONFIRMATION");

        console.log("Transaction Approved");
      } catch (error) {
        console.log(error);

        alert(`${error}`);
      }
    } else {
      alert(
        "Sorry commenceTime can not be in the past, pick a time higher than current time"
      );
    }
  };

  const rVotingEnd = async () => {
    try {
      if (walletAddr) {
        const contract = await connectContract();
        const retrieveVtEnd = await contract.retrieveVotingEnd();
        console.log("End time is near context " + retrieveVtEnd);
        return retrieveVtEnd;
      }
    } catch (error) {
      alert(error);
    }
  };

  const enlistVoter = async () => {
    try {
      if (walletAddr) {
        const contract = await connectContract();
        await contract.enlistVoter();
        alert(
          `${walletAddr} You have been registered to vote, kindly cast your vote once voting commences kINDLY WAIT FOR TRANSACTION APPROVAL`
        );
        console.log(
          `${walletAddr} You have been registered to vote you can now cast your vote once voting has commenced `
        );
        router.push("/place-vote");
      } else {
        alert("please connect wallet");
      }
    } catch (error) {
      console.log(error);

      alert(`${error.message}`);
    }
  };

  const retrieveVotingStart = async () => {
    try {
      if (walletAddr) {
        const contract = await connectContract();
        const vtStartTime = await contract.retrieveVotingStart();
        console.log("start contest time " + vtStartTime);
        return vtStartTime;
      }
    } catch (error) {
      alert(error);
    }
  };

  const voteNow = async (aspirantIndex) => {
    console.log("function triggered");
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);

    console.log(currentTimestampInSeconds);
    try {
      if (walletAddr) {
        const contract = await connectContract();
        const commenceTime = await retrieveVotingStart();
        const endTime = await rVotingEnd();
        console.log(commenceTime + " " + endTime);
        if (
          currentTimestampInSeconds >= commenceTime.toNumber() &&
          currentTimestampInSeconds < endTime.toNumber()
        ) {
          await contract.voteNow(aspirantIndex);
          alert("Kindly WAIT FOR TRANSACTION APPROVAL");
        } else {
          alert("Sorry it's either that voting has not started or it's over");
        }
      } else {
        alert(`please connect wallet`);
        console.log("please connect wallet");
      }
    } catch (error) {
      console.log(error);
      alert("You have already voted.");
    }
  };

  const registeredVoters = async () => {
    const votersInfo = [];
    try {
      const contract = await connectContract();
      const registeredVoters = await contract.retrieveRegisteredVoters();

      await Promise.all(
        registeredVoters.map(async (address, index) => {
          const voted = await contract.retrieveVotervotedAlready(address);
          const votedFor = await contract.retrieveVotedFor(address);
          const formatted = ethers.utils.formatUnits(votedFor.toString());

          const voterInfo = {
            voteraddress: address,
            votedAlready: voted,
            votedFor: votedFor.toNumber(),
          };
          votersInfo.push(voterInfo);
        })
      );

      setActualVoters(votersInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveAspirant = async (aspirantIndex) => {
    try {
      if (walletAddr) {
        const contract = await connectContract();
        const result = await contract.retrieveAspirant(aspirantIndex);
        const aspirants = [result[0], result[1].toNumber()];
        console.log(aspirants);
        return aspirants;
      } else {
        alert("Kindly connect wallet!!");
      }
    } catch (error) {
      console.log("Error transaction unapproved: " + error);
      alert("Error transaction unapproved: " + error.message);
    }
  };

  const retrieveAspirantLength = async () => {
    try {
      if (walletAddr) {
        const contract = await connectContract();

        const length = await contract.retrieveAspirantsLength();
        console.log("Length of aspirants " + length);
        return length.toNumber();
      } else {
      }
    } catch (error) {
      alert(error.message + " transaction unapproved;");
    }
  };

  const isVotingEnd = async () => {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);

    console.log("function triggered" + " " + currentTimestampInSeconds);
    try {
      if (walletAddr) {
        const endTime = await rVotingEnd();
        console.log("end time " + endTime);

        const isVotingEnded = currentTimestampInSeconds > endTime.toNumber();

        if (isVotingEnded) {
          console.log("Voting has ended");
        } else {
          console.log("Voting is still open");
        }
        return isVotingEnded;
      }
    } catch (error) {
      alert(error.message + "Transaction successful");
    }
  };
  const retrieveTotalAndWinner = async () => {
    console.log("function triggered");
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    try {
      if (walletAddr) {
        console.log("We got it ");
        const contract = await connectContract();
        console.log("Contract connected");
        const endTime = await rVotingEnd();
        console.log("End Time received " + endTime);
        if (currentTimestampInSeconds >= endTime) {
          const winner = await contract.retrieveWinner();
          const votesTotal = await contract.retrieveTotalVotes();
          console.log(votesTotal.toNumber() + " testing " + winner);
          return { votesTotal: votesTotal.toNumber(), winner };
        } else {
          return (
            "Voting result will be displayed after voting has ended",
            "Vote count is yet to be collated"
          );
        }
      }
    } catch (error) {
      alert(error.message + "transaction unapproved");
    }
  };

  const freshPoll = async () => {
    console.log("function triggered");
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    try {
      const contract = await connectContract();
      const endTime = await rVotingEnd();
      if (currentTimestampInSeconds >= endTime) {
        console.log("You can create new election");

        await contract.freshPoll();
        router.push("/votingChairman");
        alert(
          "You may proceed to shortlist aspirants and required timestamps to start a new vote in session. "
        );
      }
    } catch (error) {
      alert("Sorry, only votingChairman can start a new election.");
    }
  };

  return (
    <ContextElection.Provider
      value={{
        connectWallet,
        rVotingEnd,
        walletConnected,
        grantOwnership,
        retrieveAspirant,
        retrieveAspirantLength,
        actualVoters,
        registeredVoters,
        walletAddr,
        votingChairman,
        getContract,
        enlistVoter,
        voteNow,
        aspirants,
        retrieveTotalAndWinner,
        isVotingEnd,
        freshPoll,
      }}
    >
      {children}
    </ContextElection.Provider>
  );
};

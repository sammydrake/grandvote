// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Grandvote {

    // Define two structs to represent an aspirant and a voter.
    struct Aspirant {
        string nameAspirant;
        uint256 voteCount;
    }
    
    struct Voter {
        bool isRegistered;
        bool votedAlready;
        uint256 votedFor;
    }

    

    
// Define state variables for the contract.
    uint256 public listingPrice = 0.0000024 ether;
    address public votingChairman;
    mapping(address => Voter) public voters; 
    Aspirant[] public aspirants;
    uint256 public votingCommence;
    uint256 public votingEnd;
    uint256 public minimumVotes;
    bool public isVotingOpen;
    bool public aspirantsAdded;
    uint256 public totalVotes;
    address[] enlistedVoters;
    uint256 public timestamp;
    

    
// Define the constructor for the contract.
   constructor()  {
         votingChairman = msg.sender;
   }

   // Define a modifier to restrict certain functions to the voting chairman.
   modifier onlyVotingChairman (){
        require(msg.sender == votingChairman, "Only the Voting Chairman can perform this action");
        _;
    }

    // Define a function to get the address of the voting chairman.
    function getVotingChairman() external view returns (address) {
        return votingChairman;
    }


    // Define a function to allow the voting chairman to transfer ownership of the contract.
    function grantOwnership(address _address) public {
        require(msg.sender == votingChairman, "Only the owner can transfer ownership.");
        votingChairman = _address;
    }

    

    // Define a function to add aspirants to the election.
    function addAspirants(string[] memory aspirantsName, uint256 votingCommenceTime, uint256 votingEndTime, uint256 minVotes) public onlyVotingChairman()  {
        
        require(!aspirantsAdded, "Candidates have been added, hold on for the voting chairman to declare new election");
        require(aspirantsName.length > 0, "Atleast one Aspirant must be added");
        require(votingCommenceTime < votingEndTime, "End time of voting must be after voting commence time");
        // Add aspirants to the array
        for (uint256 i = 0; i < aspirantsName.length; i++) {
            aspirants.push(Aspirant({
                nameAspirant: aspirantsName[i],
                voteCount: 0
            }));
        }
        votingCommence = votingCommenceTime;
        votingEnd = votingEndTime;
        minimumVotes = minVotes;
        isVotingOpen = true;  
        aspirantsAdded = true; 
    }
   
    // Define a function that registers a voter by adding them to the enlistedVoters array and setting their 'isRegistered' flag to true
    function enlistVoter() public {
        require(isVotingOpen, "Voting is ended");
        require(!voters[msg.sender].isRegistered, "Voter is registered");
        voters[msg.sender].isRegistered = true;
        enlistedVoters.push(msg.sender);
    }
    
    // Define a function that allows a registered voter to cast their vote for a specific aspirant
    function voteNow(uint256 aspirantIndex) public {
        require(isVotingOpen, "Voting is ended");
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(!voters[msg.sender].votedAlready, "Voter has voted");
        require(aspirantIndex < aspirants.length, "Invalid Aspirant index");
        voters[msg.sender].votedAlready = true;
        voters[msg.sender].votedFor = aspirantIndex;
        aspirants[aspirantIndex].voteCount++;
        totalVotes++;
    }

    //Define a function that ends the voting process by setting the 'isVotingOpen' flag to false
    function endVoting() public onlyVotingChairman(){
        require(timestamp >= votingEnd, "Voting has not ended");
        require(totalVotes >= minimumVotes, "Votes are not enough");
        isVotingOpen = false;
    }

    // Define a function that returns the timestamp for the start of the voting process
    function retrieveVotingStart() public view returns(uint256){
       return(votingCommence);
    }

    // Define a function that returns the timestamp for the end of the voting process
    function retrieveVotingEnd() public view returns(uint256){
       return(votingEnd);
    }

    // Define a function that returns a boolean indicating whether the given voter has already cast their vote
    function retrieveAspirantsLength() public view returns (uint256){
        return aspirants.length;
    }
    
    
    // Define a function that returns the nameAspirant and vote count of an aspirant with the given index
    function retrieveAspirant(uint256 aspirantIndex) public view returns (string memory, uint256) {
        require(aspirantIndex < aspirants.length, "Invalid Aspirant index");
        return (aspirants[aspirantIndex].nameAspirant, aspirants[aspirantIndex].voteCount);
    }


    // Define a function that returns an array containing the addresses of all registered voters
    function retrieveVotedFor(address  voter) public view returns (uint256){
        return voters[voter].votedFor;
    }
    
    
    // Define a function that returns the index of the aspirant that the given voter has voted for
    function retrieveVotervotedAlready(address  voter) public view returns (bool) {
        return voters[voter].votedAlready;
    }

    
    // Define a function that returns an array containing the addresses of all registered voters
    function retrieveRegisteredVoters() public view returns (address[] memory){
        return enlistedVoters;
    } 

    // Define a function that returns the total number of votes cast in the election
    function retrieveTotalVotes() public view returns(uint256){
        return totalVotes;
    }

    // Define a function that returns the nameAspirant of the aspirant with the highest number of votes
    function retrieveWinner() public view returns (string memory) {
        //require(!isVotingOpen || timestamp >= votingEnd, "Voting has not ended yet");
        uint256 winningVoteCount = 0;
        uint256 winningAspirantIndex = 0;
        for (uint256 i = 0; i < aspirants.length; i++) {
            if (aspirants[i].voteCount > winningVoteCount) {
                winningVoteCount = aspirants[i].voteCount;
                winningAspirantIndex = i;
                
            }
        }
        return aspirants[winningAspirantIndex].nameAspirant;
    }

    // Define a function that clears all data related to the current election, effectively starting a new election
   function freshPoll() public onlyVotingChairman(){
        delete aspirants;
        totalVotes = 0;
        undoMapping();
        delete enlistedVoters;
        aspirantsAdded = false;
    }
    // Define a function that clears the mapping of voters to their registration status and voting choices
    function undoMapping () public {
        if(enlistedVoters.length > 0){
            for(uint256 i = 0 ; i < enlistedVoters.length ; i++){
                delete voters[enlistedVoters[i]];
            }
        }
    }
}

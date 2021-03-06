pragma solidity ^0.4.24;

/*
-- For Oakland Blockchain Developers Meetup
-- 10/19/2017 @ Learners Guild workspace
-- https://medium.com/@zubairnahmed/https-medium-com-zubairnahmed-react-ethereum-getting-started-with-the-minimum-toolset-required-part-1-of-4-9562efa23d18
*/

// Phase 0 -- Basic Contract Scaffold
// Phase 1 -- Interacting with Public Variables
// Phase 2 -- Setting up and Interacting with React
// Phase 3 -- Contract State Manipulation
// Phase 4 -- Conditionals on Smart Contract

contract ReactExample {
	// Phase 0
	address private owner;
	// Phase 1
	string public you_awesome;
	// Phase 2
//	string private secret;
	// Phase 3
	string private state;
	// Phase 4
	bool public pseudoRandomResult;
	
	event ExperimentComplete (bool result);

	// Phase 0
	constructor () public {
		// Phase 0
		owner = msg.sender;
		// Phase 1
		you_awesome = "You are awesome!";
		// Phase 2
//		secret = "secret data";
		// Phase 3
		state = "Initial state";
	}

	// Phase 0
	// Offer owner contract a way to destroy contract if it gets compromised
	function kill () public {
		require (msg.sender == owner);
		selfdestruct (owner);
	}

	// Phase 2
	// Get balance of contract
	function getBalance () public view returns (uint256) {
		return address(this).balance;
	}

	// Phase 3
	// Get some state from contract
	function getState () public view returns (string) {
		return state;
	}

	// Phase 3
	// Set new state to contract
	function setState (string newState) public payable {
		state = newState;
	}

	// Phase 4
	// Set an experiment that returns whether data met some threshold
	function setExperimentInMotion () public payable returns (bool) {
		bytes32 _pseudoRandomResult = keccak256 (msg.data);
		// Some conditional depending on application's intention
		if (_pseudoRandomResult > bytes32 (10)) pseudoRandomResult = true;
		else pseudoRandomResult = false;

		// Emit event for React frontend
		emit ExperimentComplete (pseudoRandomResult);
	}

	// Phase 0
	// Fallback function in case someone sends ether to this contract
	function () public payable {
//		revert ();
	}
}
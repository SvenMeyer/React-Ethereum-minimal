import React, { Component } from 'react';
import logo from './logo.svg';
// import ReactExampleJSON from '../build/contracts/ReactExample.json';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		
		// this is the ABI for the contract, get it from Remix details page
		const ABI = [
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"name": "result",
						"type": "bool"
					}
				],
				"name": "ExperimentComplete",
				"type": "event"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "kill",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "setExperimentInMotion",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "newState",
						"type": "string"
					}
				],
				"name": "setState",
				"outputs": [],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"payable": true,
				"stateMutability": "payable",
				"type": "fallback"
			},
			{
				"inputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getBalance",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getState",
				"outputs": [
					{
						"name": "",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "pseudoRandomResult",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "you_awesome",
				"outputs": [
					{
						"name": "",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
		];

		// get the web3 object injected by MetaMask
		// TODO: add support for truffle / local web3
		const MyContract = window.web3.eth.contract(ABI);

		// deploy contract then insert address here
		// contractState is added to React component state for controlled input,
		// which is triggered anytime the user adds or delete in the input field
		this.state = {
			ContractInstance: MyContract.at("0xeec918d74c746167564401103096d45bbd494b74"),
			/* Phase 3 -- Smart Contract State Manipulation */
			contractState: ''
		}

		/* Binds getBalance. Anytime the *this* keyword is used in a function inside a class-based React component,
		the function must be bound to the component instance, which happens in this constructor. */
		this.getContractBalance = this.getContractBalance.bind(this);
		this.queryState  = this.queryState.bind(this);
		this.handleContractStateSubmit = this.handleContractStateSubmit.bind(this);
		/* Phase 4 -- Conditionals on Smart Contract */
		this.queryConditionResult = this.queryConditionResult.bind(this);
		this.activateExperiment = this.activateExperiment.bind(this);

		this.state.event = this.state.ContractInstance.ExperimentComplete();
	}

	/* Phase 2 */
	getContractBalance() {
		/* Deconstructs the getSecret function into its own variable from the ContractInstance object.
		All functions from thr contract will be available on the ContractInstance object. */
		const { getBalance } = this.state.ContractInstance;

		/* Invokes the getSecret function with a callback.
		If there are no errors, the smart contract’s secret string will be logged in our browser. */
		getBalance((err, balance) => {
			if (err) console.error('An error occured : ', err);
			console.log('This is the contracts balance : ', balance);
		})
	}
	
	/* Phase 3 */
	queryState() {
		/* Deconstructs the getSecret function into its own variable from the ContractInstance object.
		All functions from thr contract will be available on the ContractInstance object. */
		const { getState } = this.state.ContractInstance;

		/* Invokes the getState function with a callback.
		If there are no errors, the smart contract’s secret string will be logged in our browser. */
		getState((err, state) => {
			if (err) console.error('An error occured : ', err);
			console.log('This is our contract\'s STATE : ', state);
		})
	}

	/* Phase 3 */
	handleContractStateSubmit(event) {
		event.preventDefault();

		const { setState } = this.state.ContractInstance; // setState : function
		console.log({ setState });
		const { contractState: newState } = this.state;   // newState : string
		console.log({ newState });
//		const { newState2 } = this.state.contractState;   // why not this way ? ... undefned - why?
//		console.log({ newState2 });

		setState(
			newState,
			{
				gas: 300000,
				from: window.web3.eth.accounts[0],
				value: window.web3.toWei(0.01, 'ether')
			}, (err, result) => {
				console.log('Smart contract state is changing.');
			}
		)
	}

	/* Phase 4 */
	queryConditionResult() {
		const { pseudoRandomResult } = this.state.ContractInstance;

		pseudoRandomResult((err, result) => {
			console.log('This is the smart contract conditional::::', result);
		})
	}

	/* Phase 4 */
	activateExperiment() {
		const { setExperimentInMotion } = this.state.ContractInstance;

		setExperimentInMotion({
			gas: 300000,
			from: window.web3.eth.accounts[0],
			value: window.web3.toWei(0.01, 'ether')
		}, (err, result) => {
			console.log('Experiment to determine true or false set in motion.');
		})
	}

	render() {
		const link="https://medium.com/@zubairnahmed/https-medium-com-zubairnahmed-react-ethereum-getting-started-with-the-minimum-toolset-required-part-1-of-4-9562efa23d18";
		
		/* Phase 4 */
		// Code living in the render () function to be executed once event is received by React.
		this.state.event.watch((err, event) => {
			if (err) console.error('An error occured::::', err);
			console.log('This is the event::::', event);
			console.log('This is the experiment result::::', event.args.result);
		});

		return (
			<div className="App">
			
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<br /><br />

				<button onClick={this.getContractBalance}>Get smart contract BALANCE</button>&nbsp;&nbsp;&nbsp;&nbsp;
				
				<button onClick={this.queryState}>Get smart contract STATE</button><br /><br />

				{/* Phase 3 */}
				<form onSubmit={this.handleContractStateSubmit}>
					<input
						type="text"
						name="state-change"
						placeholder="Enter new state..."
						value={this.state.contractState}
						onChange={event => this.setState({ contractState: event.target.value })} />
					<button type="submit"> Submit </button>
				</form>

				{/* Phase 4 */}
				<br />
				<br />
				<button onClick={this.queryConditionResult}> Query Smart Contract Conditional Result </button>
				<br />
				<br />
				<button onClick={this.activateExperiment}> Start Experiment on Smart Contract </button>

				<p className="App-intro">
					More information on this tutorial project here:<br />
					<a href={link}>{link}</a><br />
				</p>
			</div>
		);
	}
}

export default App;

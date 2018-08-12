import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		
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
				"inputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"payable": true,
				"stateMutability": "payable",
				"type": "fallback"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getSecret",
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

		const MyContract = window.web3.eth.contract(ABI);

		// deploy contract then insert address here
		this.state = {
			ContractInstance: MyContract.at("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf")
		}

		/* (line 45) Phase 2 */
		/* Binds querySecret. Anytime the this keyword is used in a function inside a class-based React component,
		the function must be bound to the component instance, which happens in the constructor. */
		this.querySecret = this.querySecret.bind(this);
	}

	/* Phase 2 */
	querySecret() {
		/* Deconstructs the getSecret function into its own variable from the ContractInstance object.
		All functions from thr contract will be available on the ContractInstance object. */
		const { getSecret } = this.state.ContractInstance;

		/* Invokes the getSecret function with a callback.
		If there are no errors, the smart contract’s secret string will be logged in our browser. */
		getSecret((err, secret) => {
			if (err) console.error('An error occured::::', err);
			console.log('This is our contract\'s secret::::', secret);
		})
	}
	
	render() {
		return (
			<div className="App">
			
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>

				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>

				<button onClick={this.querySecret}>Get smart contract secret</button>

			</div>
		);
	}
}

export default App;

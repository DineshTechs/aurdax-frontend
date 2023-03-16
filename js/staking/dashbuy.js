///////////////////////////
web3.eth.defaultAccount = web3.eth.accounts[0];
///////////////////////////

async function stakeNow() {
	var amount = document.getElementById("stakeAmt").value
	if (amount == 0) {
		return swal("Enter Stake Amount!")
	}
	if (document.getElementById('30days').checked) {
		stakeq("1")
	} else if (document.getElementById('90days').checked) {
		stakeq("2")
	} else if (document.getElementById('365days').checked) {
		stakeq("3")
	} else {
		swal("Select Lock Period!")
	}
}


async function stakeq(typeOfStake) {
	var amount = document.getElementById("stakeAmt").value
	//hideLoadingApproval()
	var str = await getAccountAddress();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	//let result


	contract1 = new web3.eth.Contract(tokenAbi, tokenContract);
	contract2 = new web3.eth.Contract(stakingAbi, stakingContract);
	////////////////////////////////////

	const res = await contract1.methods.allowance(str, stakingContract).call();
	console.log(res);
	if (res >= amount * 1e18) {
		stake(typeOfStake);
	} else {
		const result = await contract1.methods.approve(stakingContract, web3.utils.toWei(amount)).send({
			from: str
		}, (err, res) => {
			if (!err) {
				document.getElementById("dsnone").style = "display:block;"
			}
		});
		//console.log(result.blockHash);
		if (result) {
			document.getElementById("dsnone").style = "display:none;"
			document.getElementById("dsnone").style = "display:none;"
			stake(typeOfStake);
			//trackTransaction(result.blockHash);
		}
	}

}


async function stake(typeOfStake) {
	var str = await getAccountAddress();
	contract2 = new web3.eth.Contract(stakingAbi, stakingContract);
	var amount = document.getElementById("stakeAmt").value
	result = await contract2.methods.stake(web3.utils.toWei(amount), typeOfStake, radd).send({
		from: str
	});
	if (result) {
		swal("Successfully Stake is Completed!")
	}

}


async function unstake() {
	var str = await getAccountAddress();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	let result;
	result = await contract2.methods.unstake1().send({
		from: str
	});
}


async function withdraw() {
	var str = await getAccountAddress();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	let result;

	if (Number(document.getElementById("myRewards3").innerHTML) > 0) {
		result = await contract2.methods.withdrawReward1().send({
			from: str
		});
		if (result) {
			swal("Your Withdrawl is Successfully Completed!")
		}
	} else {
		swal("No Amount Available!")
	}

}

// async function switchNetwork() {
// 	// try {
// 	// 	await ethereum.request({
// 	// 	  method: 'wallet_switchEthereumChain',
// 	// 	  params: [{ chainId: '0x7E6D' }],
// 	// 	});
// 	//   } catch (switchError) {
// 	// 	// This error code indicates that the chain has not been added to MetaMask.
// 	// 	if (switchError.code === 4902) {
// 	try {
// 		await ethereum.request({
// 			method: 'wallet_addEthereumChain',
// 			params: [{
// 				chainId: '0x1DCE',
// 				chainName: 'VRB20',
// 				rpcUrls: ['https://mainnet-rpc.vrblocksscan.io/'] /* ... */ ,
// 				blockExplorerUrls: ['https://vrblocksscan.io/'],
// 				nativeCurrency: {
// 					name: 'VRB',
// 					symbol: 'VRB', // 2-6 characters long
// 					decimals: 18
// 				}
// 			}, ],
// 		});
// 	} catch (addError) {
// 		alert(addError)
// 		// handle "add" error
// 	}
// 	//}
// 	// handle other "switch" errors
// 	//}

// }
///////////////////////////
web3.eth.defaultAccount = web3.eth.accounts[0];
///////////////////////////


async function stake(typeOfStake) {
	web3.eth.defaultAccount = web3.eth.accounts[0];
	var amount = 0;
	if (typeOfStake == '1') {
		amount = document.getElementById("stake1").value;
	}
	else if (typeOfStake == '2') {
		amount = document.getElementById("stake2").value;
	}
	else {
		alert("Error Contact Developer!")
	}

	if(amount<1000){
		return alert("Minimum Yield Amount is 1000!")
	}

	stakenow(amount, typeOfStake)
	//document.getElementById("tostakeAmount").value;
	//alert(amount);
	//localStorage.setItem("level",id);
	//alert(amount);

	//var str = await getAccountAddress();
	//contract2 = new web3.eth.Contract(abi2, contractaddress2);
	////////////////////////////////////

	// const res = await contract1.methods.allowance(str, contractaddress2).call();
	// console.log(res);
	// if (res >= amount * 1e18) {
	// 	stakenow(amount, typeOfStake);
	// }
	// else {
	// 	const result = await contract1.methods.approve(contractaddress2, web3.utils.toWei(amount)).send({ from: str },(err,res) =>{
	// 		if(!err){
	// 			if (typeOfStake == '1') {
	// 				document.getElementById("stakeSpinner1").style ="display:block;"
	// 			}
	// 			else{
	// 				document.getElementById("stakeSpinner2").style ="display:block;"
	// 			}
				
	// 		}
	// 		// else{
	// 		// 	document.getElementById("stakeSpinner1").style ="display:none;"
	// 		// 	document.getElementById("stakeSpinner2").style ="display:none;"
	// 		// }
	// 	});
	// 	//console.log(result.blockHash);
	// 	if (result) {			
	// 		document.getElementById("stakeSpinner1").style ="display:none;"
	// 		document.getElementById("stakeSpinner2").style ="display:none;"
	// 		stakenow(amount, typeOfStake);
	// 		//trackTransaction(result.blockHash);
	// 	}
	// }


}

async function stakenow(amount, typeOfStake) {
	//hideLoadingApproval()
	var str = await getAccountAddress();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	let result
	if (typeOfStake == '1') {
		result = await contract2.methods.stake1(radd).send({ from: str,value:web3.utils.toWei(amount) });
		if(result){
			alert("Successfully Yield is Completed!")
		}
	}
	else if (typeOfStake == '2') {
		result = await contract2.methods.stake2(radd).send({ from: str,value:web3.utils.toWei(amount) });
		if(result){
			alert("Successfully Yield is Completed!")
		}
	}
	else {
		//result = await contract2.methods.stake3(web3.utils.toWei(amount), radd).send({ from: str });
	}


}



async function unstake(typeUnstake) {
	var str = await getAccountAddress();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	let result;
	if (typeUnstake == '1') {
		result = await contract2.methods.unstake1().send({ from: str });

	}
	else if (typeUnstake == '2') {
		result = await contract2.methods.unstake2().send({ from: str });

	}
	else {
		//result = await contract2.methods.unstake3().send({ from: str });

	}

}


async function withdraw(typeOfWithdraw) {
	var str = await getAccountAddress();
	web3.eth.defaultAccount = web3.eth.accounts[0];
	let result;
	if (typeOfWithdraw == '1') {
		if(Number(document.getElementById("rewardsAvailable1").innerHTML) > 0 || Number(document.getElementById("previousRewardBal1").innerHTML) > 0){
		result = await contract2.methods.withdrawReward1().send({ from: str });
		if(result){
			alert("Your Withdrawl is Successfully Completed!")
		}
		}else{
			alert("No Amount Available!")
		}
	}
	else if (typeOfWithdraw == '2') {
		if(Number(document.getElementById("rewardsAvailable2").innerHTML) > 0 || Number(document.getElementById("previousRewardBal2").innerHTML) > 0){
			result = await contract2.methods.withdrawReward2().send({ from: str });
			if(result){
				alert("Your Withdrawl is Successfully Completed!")
			}
			}else{
				alert("No Amount Available!")
			}
	}
	else {
		//result = await contract2.methods.withdrawReward3().send({ from: str });
	}


}

async function switchNetwork(){
	// try {
	// 	await ethereum.request({
	// 	  method: 'wallet_switchEthereumChain',
	// 	  params: [{ chainId: '0x7E6D' }],
	// 	});
	//   } catch (switchError) {
	// 	// This error code indicates that the chain has not been added to MetaMask.
	// 	if (switchError.code === 4902) {
		  try {
			await ethereum.request({
			  method: 'wallet_addEthereumChain',
			  params: [
				{
				  chainId: '0x1DCE',
				  chainName: 'VRB20',
				  rpcUrls: ['https://mainnet-rpc.vrblocksscan.io/'] /* ... */,
				  blockExplorerUrls: ['https://vrblocksscan.io/'],
				  nativeCurrency: {
					name: 'VRB',
					symbol: 'VRB', // 2-6 characters long
					decimals: 18
				  }
				},
			  ],
			});
		  } catch (addError) {
			alert(addError)
			// handle "add" error
		  }
		//}
		// handle other "switch" errors
	  //}

}





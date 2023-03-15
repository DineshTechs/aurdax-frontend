///////////////////////////
//web3.eth.defaultAccount = web3.eth.accounts[0];
///////////////////////////
setInterval(function () {
	if (web3)
		try {
			//console.log("web3 found!");
			load();
		} catch (e) {}
	console.log("AutoCall");
}, 5000);
///////////////////////////
async function load() {
	/////////////////////
	//var address = localStorage.getItem("address");
	var str = await getAccountAddress();
	//document.getElementById("address").innerHTML = str.substring(1,10) + ".....";
	/////////////////////
	contract1 = new web3.eth.Contract(tokenAbi, tokenContract);
	contract2 = new web3.eth.Contract(stakingAbi, stakingContract);
	/////////////////////


	//const tokenBal = await contract1.methods.balanceOf(str).call();
	//document.getElementById("myTokenBal").innerHTML = ((tokenBal) / 1000000000000000000).toFixed(2);

	let coinBal = await await web3.eth.getBalance(str)
	coinBal = ((coinBal) / 1000000000000000000).toFixed(2)
	document.getElementById("myBal").innerHTML = coinBal;
	document.getElementById("myBal1").innerHTML = coinBal;

	const user = await contract2.methods.user(str).call();
	//console.log(user);
	// document.getElementById("stakeAmount1").innerHTML = ((user.stakedBal1) / 1000000000000000000).toFixed(2);
	// document.getElementById("stakeAmount2").innerHTML = ((user.stakedBal2) / 1000000000000000000).toFixed(2);
	// document.getElementById("staked1").value = ((user.stakedBal1) / 1000000000000000000).toFixed(2);
	// document.getElementById("staked2").value = ((user.stakedBal2) / 1000000000000000000).toFixed(2);

	// document.getElementById("rewardsWithdrawn1").innerHTML = ((user.rewardsWithdrawn1) / 1000000000000000000).toFixed(2);
	// document.getElementById("rewardsWithdrawn2").innerHTML = ((user.rewardsWithdrawn2) / 1000000000000000000).toFixed(2);

	// document.getElementById("previousRewardBal1").innerHTML = ((user.previousRewardBal1) / 1000000000000000000).toFixed(2);
	// document.getElementById("previousRewardBal2").innerHTML = ((user.previousRewardBal2) / 1000000000000000000).toFixed(2);

	// if (user.stakedTime1 > 0) {
	// 	var date1 = new Date(user.stakedTime1 * 1000)
	// 	document.getElementById("stakedTime1").innerHTML = date1;
	// } else {
	// 	document.getElementById("stakedTime1").innerHTML = "-";
	// }

	// if (user.stakedTime2 > 0) {
	// 	var date2 = new Date(user.stakedTime2 * 1000)
	// 	document.getElementById("stakedTime2").innerHTML = date2;
	// } else {
	// 	document.getElementById("stakedTime2").innerHTML = "-";
	// }


	// const reward1 = await contract2.methods.IntervalRewardsOf1(str).call();
	// document.getElementById("rewardsAvailable1").innerHTML = (reward1 / 1000000000000000000).toFixed(2);

	// const reward2 = await contract2.methods.IntervalRewardsOf2(str).call();
	// document.getElementById("rewardsAvailable2").innerHTML = (reward2 / 1000000000000000000).toFixed(2);

	// const affRewards = await contract2.methods.referralEarnings(str).call();
	// //console.log(affRewards[0])
	// document.getElementById("level1Rewards").innerHTML = (affRewards[0] / 1000000000000000000).toFixed(2);
	// document.getElementById("level2Rewards").innerHTML = (affRewards[1] / 1000000000000000000).toFixed(2);
	// document.getElementById("level3Rewards").innerHTML = (affRewards[2] / 1000000000000000000).toFixed(2);
	// document.getElementById("level4Rewards").innerHTML = (affRewards[3] / 1000000000000000000).toFixed(2);
	// document.getElementById("level5Rewards").innerHTML = (affRewards[4] / 1000000000000000000).toFixed(2);

	// const totalAff = ((Number(affRewards[0]) + Number(affRewards[1]) + Number(affRewards[2]) + Number(affRewards[3]) + Number(affRewards[4])) / 1000000000000000000).toFixed(2);
	// document.getElementById("affReward").innerHTML = totalAff;

	// const upline = await contract2.methods.upline(str).call();
	// if (upline != '0x0000000000000000000000000000000000000000') {
	// 	console.log(upline)
	// 	document.getElementById("upline1").innerHTML = upline.substring(0, 12) + "...";
	// 	document.getElementById("upline2").innerHTML = upline;
	// } else {
	// 	document.getElementById("upline1").innerHTML = "None"; //upline.substring(0, 12) + "...";
	// 	document.getElementById("upline2").innerHTML = "0x0000000000000000000000000000000000000000"; //upline;
	// }

	reffAddress()
	if (localStorage.getItem('masternode') !== null) {
		radd = localStorage.getItem('masternode');
		//document.getElementById("currentSponsor").innerHTML = radd;
	} else {
		radd = "0x0000000000000000000000000000000000000000";
	}

}

async function reffAddress() {
	//console.log(window.location)
	var location = window.location.origin
	var reff = location + "/index.html?ref=" + await getAccountAddress();
	document.getElementById('refLink').value = reff;
	//const input = document.getElementById('refLink')//.innerText;
	//input.focus()
	//input.select()
}

async function getAccountAddress() {
	try {
		const accounts = await web3.eth.getAccounts();
		//console.log(accounts[0]);
		return accounts[0];
	} catch (e) {}
}

function visitBSC() {
	var url = "https://bscscan.com/address/" + contractaddress2;
	window.open(url);

}
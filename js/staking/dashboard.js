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


	const tokenBal = await contract1.methods.balanceOf(str).call();
	document.getElementById("myBal1").innerHTML = ((tokenBal) / 1000000000000000000).toFixed(2);
	document.getElementById("tokenBal").innerHTML = ((tokenBal) / 1000000000000000000).toFixed(2);

	let coinBal = await web3.eth.getBalance(str)
	coinBal = ((coinBal) / 1000000000000000000).toFixed(2)
	document.getElementById("ethBal").innerHTML = coinBal;


	let rewardsBal = await contract2.methods.IntervalRewardsOf1(str).call()
	//console.log(rewardsBal)
	document.getElementById("myRewards1").innerHTML = ((rewardsBal) / 1000000000000000000).toFixed(2) + " ";
	document.getElementById("myRewards2").innerHTML = ((rewardsBal) / 1000000000000000000).toFixed(2);
	document.getElementById("myRewards3").innerHTML = ((rewardsBal) / 1000000000000000000).toFixed(2);
	document.getElementById("myRewards4").innerHTML = ((rewardsBal) / 1000000000000000000).toFixed(2);

	const user = await contract2.methods.user(str).call();
	//console.log(user);
	document.getElementById("stakeAmount").innerHTML = ((user.stakedBal1) / 1000000000000000000).toFixed(2);
	document.getElementById("stakeAmount2").innerHTML = ((user.stakedBal1) / 1000000000000000000).toFixed(2);

	const refEarning = await contract2.methods.refferedEarning(str).call()
	document.getElementById("affliateRewards").innerHTML = ((refEarning) / 1000000000000000000).toFixed(2);

	if (user.stakedTime1 > 0) {
		var date1 = new Date(user.stakedTime1 * 1000)
		document.getElementById("time").innerHTML = date1;
	} else {
		document.getElementById("time").innerHTML = "-- : --";
	}

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
	document.getElementById('affAddress').innerHTML = reff;
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
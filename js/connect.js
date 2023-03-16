window.onload = connect()

function connect() {

	request();

}
let web3;
async function request() {
	if (typeof window.ethereum !== 'undefined') {
		const accounts = await ethereum.request({
			method: 'eth_requestAccounts'
		});
		const account = accounts[0];
		web3 = new Web3(window.ethereum);
		console.log(account);

		const chainId = await web3.eth.getChainId();
		// // Load chain information over an HTTP API
		console.log(chainId)
		// let selectedChainCurrent = '56'
		//if (chainId != 7630 || chainId != 56) {
		testNetwork()
		//}
		//  if(chainId != 32365 || chainId != 97){          
		// 	vrbNetwork()
		//    }

		if (account) {
			document.getElementById("connectbtn").innerHTML = account.substring(0, 6) + "..." + account.substring(38, 42);
		}


		//login();
		//hideLoadingApproval();
	} else {
		alert("Metamask Not Found!");
	}
}

const login = async () => {
	if (web3) {
		location.href = './dashboard.html'
	} else {
		alert("Connect Wallet!")
	}

}
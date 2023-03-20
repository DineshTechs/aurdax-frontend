setInterval(function () {
  try {
    load();
  } catch (e) {
    console.log(e)
  }
  try {
    load2();
  } catch (e) {}
  console.log("AutoCall");
}, 5000);



async function load() {
  var str = await getAccountAddress();
  let contract1 = await new web3.eth.Contract(contractAbi, tokenContract);
  let contract3 = await new web3.eth.Contract(contractSaleAbi, saleContract);

  let totalInvest = await contract3.methods.totalInvestment().call()
  totalInvest = ((totalInvest) / 1000000000000000000).toFixed(2)
  console.log("invest : " + totalInvest)
  const x = (totalInvest / 25000) * 100
  startProgressHome(x)
  document.getElementById('investedValue').innerHTML = x + '/25000'

  let polkaBal = await contract1.methods.balanceOf(str).call()
  polkaBal = ((polkaBal) / 1000000000000000000).toFixed(2)
  document.getElementById('tokenBal').innerHTML = polkaBal
  document.getElementById('tokenBal2').innerHTML = polkaBal + " DALLE2"
  //console.log(polkaBal)

  let busdBal = await web3.eth.getBalance(str)
  busdBal = ((busdBal) / 1000000000000000000).toFixed(2)
  document.getElementById('ethBal').innerHTML = busdBal + ' ETH'
  //document.getElementById('busdBal1').innerHTML = 'Bal : ' + busdBal
  //console.log(busdBal)

  let user = await contract3.methods.user(str).call()
  console.log(user)
  //console.log(user.investment)
  //console.log(user.lockedAmount)
  document.getElementById('claimableToken').innerHTML = (Number(user.lockedAmount) / 1000000000000000000).toFixed(2)
  document.getElementById('claimableToken2').innerHTML = (Number(user.lockedAmount) / 1000000000000000000).toFixed(2)
  document.getElementById('investedETH').innerHTML = (Number(user.investment) / 1000000000000000000).toFixed(2)

  let white = await contract3.methods.checkWhiteList(str).call()
  if (!white) {
    document.getElementById('whitelist').innerHTML = '<b>NOT WHITELISTED</b>'
    //document.getElementById('whitelist1').innerHTML = '<b>NOT WHITELISTED</b>'
    //console.log(white)
  } else {
    document.getElementById('whitelist').innerHTML = '<b>WHITELISTED</b>'
    //document.getElementById('whitelist1').innerHTML = '<b>WHITELISTED</b>'
  }



}

const startProgressHome = (progress) => {
  document.getElementById('app-progress-bar').style.width = progress + "%";
  document.getElementById('progress-percentage').innerHTML = progress + "%";

  document.getElementById('myBar').style.width = progress + "%";
  document.getElementById('myBarPercent').innerHTML = progress + "%";

  // document.getElementById('myBar').style.width = progress + "%";
  // document.getElementById('myBarPercent').innerHTML = progress + "%";
}

async function update() {
  document.getElementById('tokenAmount').value = document.getElementById('amount').value * 25000
}


async function update1() {
  document.getElementById('tokenAmount1').value = document.getElementById('amount1').value * 25000
}

async function getAccountAddress() {
  try {
    const accounts = await web3.eth.getAccounts();
    //console.log(accounts[0]);
    return accounts[0];
  } catch (e) {}
}
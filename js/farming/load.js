setInterval(function () {
    try {
        load();
    } catch (e) {
        console.log(e)
    }
    console.log("AutoCall");
}, 5000);

const load = async () => {

    var str = await getAccountAddress()

    let lp1 = await new web3.eth.Contract(lpContractAbi, lpContract1);
    let lp2 = await new web3.eth.Contract(lpContractAbi, lpContract2);
    let lp3 = await new web3.eth.Contract(lpContractAbi, lpContract3);

    let farm1 = await new web3.eth.Contract(farmContractAbi, farmcontract1);
    let farm2 = await new web3.eth.Contract(farmContractAbi, farmcontract2);
    let farm3 = await new web3.eth.Contract(farmContractAbi, farmcontract3);

    let user1 = await farm1.methods.user(str).call()
    let user2 = await farm2.methods.user(str).call()
    let user3 = await farm3.methods.user(str).call()

    let rewardsBal1 = await farm1.methods.IntervalRewardsOf1(str).call()
    let rewardsBal2 = await farm2.methods.IntervalRewardsOf1(str).call()
    let rewardsBal3 = await farm3.methods.IntervalRewardsOf1(str).call()

    const tokenBal1 = await lp1.methods.balanceOf(str).call();
    const tokenBal2 = await lp2.methods.balanceOf(str).call();
    const tokenBal3 = await lp3.methods.balanceOf(str).call();
    //console.log(rewardsBal)

    document.getElementById("staked1").innerHTML = ((user1.stakedBal1) / 1000000000000000000).toFixed(2);
    document.getElementById("staked2").innerHTML = ((user2.stakedBal1) / 1000000000000000000).toFixed(2);
    document.getElementById("staked3").innerHTML = ((user3.stakedBal1) / 1000000000000000000).toFixed(2);

    document.getElementById("earned1").innerHTML = ((rewardsBal1) / 1000000000000000000).toFixed(2)
    document.getElementById("earned2").innerHTML = ((rewardsBal2) / 1000000000000000000).toFixed(2)
    document.getElementById("earned3").innerHTML = ((rewardsBal3) / 1000000000000000000).toFixed(2)

    document.getElementById("balance1").innerHTML = ((tokenBal1) / 1000000000000000000).toFixed(2);
    document.getElementById("balance2").innerHTML = ((tokenBal2) / 1000000000000000000).toFixed(2);
    document.getElementById("balance3").innerHTML = ((tokenBal3) / 1000000000000000000).toFixed(2);
    //document.getElementById(earnedId2).innerHTML = pendingReward.toFixed(2)

    // let balance1 = await lp1.methods.balanceOf(str).call()
    // let balance2 = await lp2.methods.balanceOf(str).call()
    // let balance3 = await lp3.methods.balanceOf(str).call()

    // balance1 = await web3.utils.fromWei(balance, 'ether')
    // balance2 = await web3.utils.fromWei(balance, 'ether')
    // balance3 = await web3.utils.fromWei(balance, 'ether')



}

async function getAccountAddress() {
    try {
        const accounts = await web3.eth.getAccounts();
        //console.log(accounts[0]);
        return accounts[0];
    } catch (e) {}
}
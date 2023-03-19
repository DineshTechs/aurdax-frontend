async function claim() {
    var str = await getAccountAddress();
    let contract3 = await new web3.eth.Contract(contractSaleAbi, saleContract);
    await contract3.methods.claimTokens().send({
        from: str
    })
}


async function refund() {
    var str = await getAccountAddress();
    let contract3 = await new web3.eth.Contract(contractSaleAbi, saleContract);
    await contract3.methods.claimBackBNB().send({
        from: str
    })
}

async function buy() {
    let amount = document.getElementById('amount').value
    if (amount < 0.5) {
        return alert("Minimum Buy Limit is 0.5 BNB")
    }
    //amount = (amount * 10**18).toString() ;
    amount = web3.utils.toWei(amount, 'ether')
    var str = await getAccountAddress();
    //let contract1 = await new web3.eth.Contract( contractAbi, tokenContract );
    //let contract2 = await new web3.eth.Contract( contractAbi, busdContract );
    let contract3 = await new web3.eth.Contract(contractSaleAbi, saleContract);

    await contract3.methods.purchaseTokens().send({
        from: str,
        value: amount
    })


}

async function buy1() {
    let amount = document.getElementById('amount1').value
    if (amount < 0.5) {
        return alert("Minimum Buy Limit is 0.5 BNB")
    }
    //amount = (amount * 10**18).toString() ;
    amount = web3.utils.toWei(amount, 'ether')
    var str = await getAccountAddress();
    //let contract1 = await new web3.eth.Contract( contractAbi, tokenContract );
    //let contract2 = await new web3.eth.Contract( contractAbi, busdContract );
    let contract3 = await new web3.eth.Contract(contractSaleAbi, saleContract);


    await contract3.methods.purchaseTokens().send({
        from: str,
        value: amount
    })


}


async function checkWhitelist() {
    var add = document.getElementById('wAddress').value
    ///alert(add)

    let contract3 = await new web3.eth.Contract(contractSaleAbi, saleContract);
    let x = await contract3.methods.checkWhiteList(add).call()
    if (!x) {
        alert("Your Address is Not Whitelisted!")
    } else {
        alert("Your Address is Whitelisted!")
    }
}
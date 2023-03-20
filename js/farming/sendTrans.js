const harvest = async (index) => {
    try {
        var requestURL = './js/farm/farms.json' //apiUrl + '/user/getAllNft'
        const response = await fetch(requestURL)
        const data = await response.json()
        var item = data[index]
        console.log(item)
        var str = await getAccountAddress()
        let farm = await new web3.eth.Contract(farmContractAbi, item.farmContract);
        const res = await farm.methods.withdraw(1).send({
            from: str
        })
    } catch (e) {
        console.log(e)
    }
}

const unstake = async (index) => {
    try {
        var requestURL = './js/farm/farms.json' //apiUrl + '/user/getAllNft'
        const response = await fetch(requestURL)
        const data = await response.json()
        var item = data[index]

        var str = await getAccountAddress()
        var id = "inputValue" + index
        var val = document.getElementById(id).value
        val = val * 10 ** 18

        let farm = await new web3.eth.Contract(farmContractAbi, item.farmContract);
        const res = await farm.methods.withdraw(1).send({
            from: str
        })

        //console.log(val)
    } catch (e) {
        console.log(e)
    }
}

const stake = async (index) => {
    try {
        var requestURL = './js/farm/farms.json' //apiUrl + '/user/getAllNft'
        const response = await fetch(requestURL)
        const data = await response.json()
        var item = data[index]

        var str = await getAccountAddress()
        var id = "inputValue" + index
        var val = document.getElementById(id).value
        val = val * 10 ** 18
        val = val.toString()

        let lp = await new web3.eth.Contract(lpContractAbi, item.lpContract);
        let farm = await new web3.eth.Contract(farmContractAbi, item.farmContract);

        const app = await lp.methods.allowance(str, item.farmContract).call();
        if (app < 115792089237316195423570985008687907853269984665640564039457584007913129639935) {
            const res = await lp.methods.approve(item.farmContract, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({
                from: str
            });
            if (res) {
                await farm.methods.deposit(val).send({
                    from: str
                })
            }
        } else {
            await farm.methods.deposit(val).send({
                from: str
            })
        }

    } catch (e) {
        console.log(e)
    }
}

async function getAccountAddress() {
    try {
        const accounts = await web3.eth.getAccounts();
        //console.log(accounts[0]);
        return accounts[0];
    } catch (e) {}
}
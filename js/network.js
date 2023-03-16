async function testNetwork() {

  // try {
  //   await ethereum.request({
  //     method: 'wallet_addEthereumChain',
  //     params: [{
  //       chainId: '0x66EED',
  //       chainName: 'Arbitrum Goerli Testnet',
  //       rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'] /* ... */ ,
  //       blockExplorerUrls: ['https://goerli.arbiscan.io/'],
  //       nativeCurrency: {
  //         name: 'ETH',
  //         symbol: 'ETH', // 2-6 characters long
  //         decimals: 18
  //       }
  //     }, ],
  //   });
  // } catch (addError) {
  //   alert(addError)
  // }

}



async function mainNetwork() {

  try {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0xA4B1',
        chainName: 'Arbitrum One',
        rpcUrls: ['https://mainnet-rpc.vrblocksscan.io/'] /* ... */ ,
        blockExplorerUrls: ['https://arbiscan.io'],
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH', // 2-6 characters long
          decimals: 18
        }
      }, ],
    });
  } catch (addError) {
    alert(addError)
  }

}
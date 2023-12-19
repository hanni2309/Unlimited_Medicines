let account;

function connectMetamask() {
    try {
        if (typeof ethereum !== 'undefined' && ethereum.isMetaMask) {
            ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    account = accounts[0];
                    localStorage.setItem('connectedAccount', account); // Lưu thông tin tài khoản vào localStorage
                    window.location.href = 'wallet.html'; // Chuyển hướng đến trang wallet.html
                })
                .catch((error) => {
                    console.error('Error connecting to MetaMask:', error);
                });
        } else {
            console.log('MetaMask not installed');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}



function disconnectMetamask() {
  try {
      // Kiểm tra nếu MetaMask đang kết nối, thì thực hiện ngắt kết nối
      if (typeof ethereum !== 'undefined' && ethereum.isMetaMask) {
          ethereum.request({ method: 'eth_accounts' })
              .then((accounts) => {
                  if (accounts.length > 0) {
                      // Thực hiện các bước để ngắt kết nối MetaMask nếu cần
                      // Ví dụ: ethereum.request({ method: 'eth_logout' });

                      // Xóa thông tin từ localStorage khi ngắt kết nối
                      
                      const connectedAccount = localStorage.getItem('connectedAccount');
                      // Chuyển hướng về trang chính hoặc trang khác nếu cần
                      if( connectedAccount !== null ){
                        localStorage.removeItem('connectedAccount');
                      window.location.href='wallet.html';
                      
                      }
                      else{
                        window.location.href = 'connectWallet.html';
                      }

                  } else {
                  
                      console.log('MetaMask is already disconnected');
                  }
              })
              .catch((error) => {
                  console.error('Error checking MetaMask connection:', error);
              });
      } else {
          console.log('MetaMask not installed');
      }
  } catch (error) {
      console.error('Unexpected error during disconnection:', error);
  }
}

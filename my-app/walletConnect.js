/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

const chainId = await ethereum.request({ method: 'eth_chainId' });

//the following line causes the app to reload itself constantly
//handleChainChanged(chainId);

ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

// This enables a metamask popup as soon as the site loads
export let currentAccount = null;
export function checkConnection() {
  if (window.ethereum !== "undefined") {
    ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });
  }
  else {
    // Metamask isn't installed
  }
}


// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
//ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
export function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    walletAlternate();
    connectButton.disabled = false;

  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    connectButton.disabled = true;
    connectButton.innerText = ("Connected");
  }

}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.


export const connectButton = document.getElementById("connect-btn");
connectButton.addEventListener("click", connect);
checkConnection();

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
export async function connect() {
  await ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });

}
//consider adding DOM elements back to trivia_script.js
const connectButton = document.getElementById("connect-btn")
connectButton.addEventListener("click",connect)
export async function connect(){
    if(typeof window.ethereum == "undefined"){
        connectButton.innerText = "Please Install Metamask"
    }
    else{
        const accounts = await ethereum.request({ method: "eth_requestAccounts" })
        const account = accounts[0]
        connectButton.innerText = "connected"
    }
}
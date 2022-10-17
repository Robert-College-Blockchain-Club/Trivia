
connectButton.addEventListener("click",connect)
const connectButton = document.getElementById("connect-btn")
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
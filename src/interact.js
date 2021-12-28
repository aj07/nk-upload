// const contractABI = require("./contract-abi.json");
// // const contractAddress = process.env.REACT_APP_ADDRESS;
// const Web3 = require("web3");
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// export const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       const addressArray = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       const obj = {
//         status: "👆🏽 Write a message in the text-field above.",
//         address: addressArray[0],
//       };
//       return obj;
//     } catch (err) {
//       return {
//         address: "",
//         status: "😥 " + err.message,
//       };
//     }
//   } else {
//     return {
//       address: "",
//       status: (
//         <span>
//           <p>
//             {" "}
//             🦊{" "}
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href={`https://metamask.io/download.html`}
//             >
//               You must install Metamask, a virtual Ethereum wallet, in your
//               browser.
//             </a>
//           </p>
//         </span>
//       ),
//     };
//   }
// };

// export const getCurrentWalletConnected = async () => {
//   if (window.ethereum) {
//     try {
//       const addressArray = await window.ethereum.request({
//         method: "eth_accounts",
//       });
//       if (addressArray.length > 0) {
//         return {
//           address: addressArray[0],
//           status: "👆🏽 Write a message in the text-field above.",
//         };
//       } else {
//         return {
//           address: "",
//           status: "🦊 Connect to Metamask using the top right button.",
//         };
//       }
//     } catch (err) {
//       return {
//         address: "",
//         status: "😥 " + err.message,
//       };
//     }
//   } else {
//     return {
//       address: "",
//       status: (
//         <span>
//           <p>
//             {" "}
//             🦊{" "}
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href={`https://metamask.io/download.html`}
//             >
//               You must install Metamask, a virtual Ethereum wallet, in your
//               browser.
//             </a>
//           </p>
//         </span>
//       ),
//     };
//   }
// };

// // async function loadContract() {
// //   return new web3.eth.Contract(contractABI, contractAddress);
// // }

// export const mintNFT = async (tokenAddress, tokenURIs, mintTo) => {
//   if (tokenURIs === []) {
//     return {
//       success: false,
//       status: "❗Please make sure all fields are completed before minting.",
//     };
//   }

//   var contract = await new web3.eth.Contract(contractABI, tokenAddress);
//   var tokenIds = [];

//   for (var i = 0; i < tokenURIs.length; i++) {
//     try {
//       var receipt = await contract.methods
//         .batchMint(mintTo, tokenURIs.length, tokenURIs)
//         .send({ from: window.ethereum.selectedAddress });
//       console.log(receipt);
//       tokenIds.push(receipt.events.Transfer.returnValues.tokenId);
//     } catch (error) {
//       return {
//         success: false,
//         status: "😥 Something went wrong: " + error.message,
//       };
//     }
//   }
//   return {
//     success: true,
//     status: "✅ Token IDs : " + tokenIds.toString(),
//   };
// };

// export const transfer = async (
//   tokenAddress,
//   tokenID,
//   address,
//   asContractOwner
// ) => {
//   if (tokenID.trim() == "" || address.trim() == "") {
//     return {
//       success: false,
//       status:
//         "❗Please make sure all fields are completed before calling function.",
//     };
//   }

//   var contract = await new web3.eth.Contract(contractABI, tokenAddress);

//   try {
//     let receipt;
//     if (asContractOwner) {
//       receipt = await contract.methods
//         .transferAsOwner(address, tokenID)
//         .send({ from: window.ethereum.selectedAddress });
//     } else {
//       receipt = await contract.methods
//         .safeTransferFrom(window.ethereum.selectedAddress, address, tokenID)
//         .send({ from: window.ethereum.selectedAddress });
//     }
//     console.log(receipt);
//     return {
//       success: true,
//       status: "Token " + tokenID + " transfered to " + address,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       status: "😥 Something went wrong: " + error.message,
//     };
//   }
// };

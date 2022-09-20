import LitJsSdk from "lit-js-sdk";

const chain = "ethereum";

/**
 * Access control for a wallet with > 0.00001 ETH
 */
// const accessControlConditionsETHBalance = [
//   {
//     contractAddress: "",
//     standardContractType: "",
//     chain,
//     method: "eth_getBalance",
//     parameters: [":userAddress", "latest"],
//     returnValueTest: {
//       comparator: ">=",
//       value: "10000000000000",
//     },
//   },
// ];

// Must hold at least one Monster Suit NFT (https://opensea.io/collection/monster-suit)
const accessControlConditionsNFT = [
  {
    contractAddress: "0xabdfb84dae7923dd346d5b1a0c6fbbb0e6e5df64",
    standardContractType: "ERC721",
    chain,
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
];

export const encryptString = async (str) => {
  console.log("encryptString :", str);
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain });
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(str);

  const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
    accessControlConditions: accessControlConditionsNFT,
    symmetricKey,
    authSig,
    chain,
  });

  return {
    encryptedFile: encryptedString,
    encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    ),
  };
};

export const decryptString = async (encryptedStr, encryptedSymmetricKey) => {
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain });

  const symmetricKey = await window.litNodeClient.getEncryptionKey({
    accessControlConditions: accessControlConditionsNFT,
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  });
  const decryptedFile = await LitJsSdk.decryptString(
    encryptedStr,
    symmetricKey
  );
  // eslint-disable-next-line no-console
  console.log({
    decryptedFile,
  });
  return { decryptedFile };
};

// import { ethers } from "ethers";
import { defineStore } from "pinia";
import nftPort from "../services/nftPort.js";

/* Import Smart Contract ABI */
// import contractAbi from "../../../artifacts/contracts/mint_tea_ERC721.sol/MTEA.json";
/* Mint Tea Contract Address */
// const contractAddress = "0x39FA9C170B61f8fFb00cBaFc0B6e5A794529cd48";

/* LFG */
export const useStore = defineStore({
  id: "store",
  state: () => ({
    txHashKey: null,
    txHash: null,
    errorCode: null,
    errorStatus: null,
    errorMessage: "",
    loading: false,
    minting: false,
    bridging: false,
    fileLoading: false,
    account: null,
    balance: null,
    searchChainId: 1,
    searchContract: "",
    searchName: "",
    searchImage: "",
    searchResults: [],
    ethereumTokens: [],
    polygonTokens: [],
    optimismTokens: [],
    arbitrumTokens: [],
    avalancheTokens: [],
    anneTokens: [],
    trendingTokens: [],
    topTokens: [],
    latestTokens: [],
  }),
  getters: {
    getTxHashKey(state) {
      return state.txHashKey;
    },
    getTxHash(state) {
      return state.txHash;
    },
    isErrorCode(state) {
      return state.errorCode;
    },
    isErrorStatus(state) {
      return state.errorStatus;
    },
    isErrorMessage(state) {
      return state.errorMessage;
    },
    isLoading(state) {
      return state.loading;
    },
    isMinting(state) {
      return state.minting;
    },
    isBridging(state) {
      return state.bridging;
    },
    isFileLoading(state) {
      return state.fileLoading;
    },
    getAccount(state) {
      return state.account;
    },
    getBalance(state) {
      return state.balance;
    },
    getSearchChainId(state) {
      return state.searchChainId;
    },
    getSearchContract(state) {
      return state.searchContract;
    },
    getSearchName(state) {
      return state.searchName;
    },
    getSearchImage(state) {
      return state.searchImage;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
    getEthereumTokens(state) {
      return state.ethereumTokens;
    },
    getPolygonTokens(state) {
      return state.polygonTokens;
    },
    getOptimismTokens(state) {
      return state.optimismTokens;
    },
    getArbitrumTokens(state) {
      return state.arbitrumTokens;
    },
    getAvalancheTokens(state) {
      return state.avalancheTokens;
    },
    getAnneTokens(state) {
      return state.anneTokens;
    },
    getTrendingTokens(state) {
      return state.trendingTokens;
    },
    getTopTokens(state) {
      return state.topTokens;
    },
    getLatestTokens(state) {
      return state.latestTokens;
    },
  },
  actions: {
    setTxHashKey(value) {
      this.txHashKey = value;
    },
    setTxHash(value) {
      this.txHash = value;
    },
    setErrorCode(value) {
      this.errorCode = value;
    },
    setErrorStatus(value) {
      this.errorStatus = value;
    },
    setErrorMessage(value) {
      this.errorMessage = value;
    },
    setLoading(value) {
      this.loading = value;
    },
    setMinting(value) {
      this.minting = value;
    },
    setBridging(value) {
      this.bridging = value;
    },
    setFileLoading(value) {
      this.fileLoading = value;
    },
    updateAccount(account) {
      this.account = account;
    },
    updateBalance(balance) {
      this.balance = balance;
    },
    updateSearchChainId(searchChainId) {
      this.searchChainId = searchChainId;
    },
    updateSearchContract(searchContract) {
      this.searchContract = searchContract;
    },
    updateSearchName(searchName) {
      this.searchName = searchName;
    },
    updateSearchImage(searchImage) {
      this.searchImage = searchImage;
    },
    addSearchResults(...tokens) {
      this.searchResults.push(...tokens);
    },
    clearSearchResults() {
      this.searchChainId = "all";
      this.searchContract = "";
      this.searchName = "";
      this.searchImage = "";
      this.searchResults = [];
    },
    addEthereumTokens(...tokens) {
      this.ethereumTokens.push(...tokens);
    },
    addPolygonTokens(...tokens) {
      this.polygonTokens.push(...tokens);
    },
    addOptimismTokens(...tokens) {
      this.optimismTokens.push(...tokens);
    },
    addArbitrumTokens(...tokens) {
      this.arbitrumTokens.push(...tokens);
    },
    addAvalancheTokens(...tokens) {
      this.avalancheTokens.push(...tokens);
    },
    addAnneTokens(...tokens) {
      this.anneTokens.push(...tokens);
    },
    addTrendingTokens(...tokens) {
      this.trendingTokens.push(...tokens);
    },
    addTopTokens(...tokens) {
      this.topTokens.push(...tokens);
    },
    addLatestTokens(...tokens) {
      this.latestTokens.push(...tokens);
    },

    /**
     * Get User 🦊 Metamask Account Balance
     */
    // async loadBalance() {
    //   this.setLoading(true);
    //   try {
    //     /*
    //      * First make sure we have access to window.ethereum
    //      */
    //     const { ethereum } = window;
    //     if (ethereum) {
    //       const provider = new ethers.providers.Web3Provider(ethereum);
    //       const signer = provider.getSigner();
    //       const contract = new ethers.Contract(
    //         contractAddress,
    //         contractAbi.abi,
    //         signer
    //       );
    //       const count = await contract.getBalance();
    //       const amount = ethers.utils.formatEther(count);

    //       /* Console log with some style */
    //       const stylesAmount = ["color: black", "background: green"].join(";");
    //       console.log("%c💰 Get Balance Amount %s 💰", stylesAmount, amount);

    //       this.balance = amount;
    //       this.setLoading(false);
    //     }
    //   } catch (error) {
    //     this.setLoading(false);
    //     console.log("loadBalance Error:", error);
    //   }
    // },

    /**
     * NFT PORT API - Search NFTs by Name and filter by Contract Address
     * @param {String} contract Results will only include NFTs from this contract address.
     * @param {String} text Required Search query
     * @param {String} chain Allowed values: polygon / ethereum / all
     * @param {String} sort_order Allowed values: desc / asc
     * @param {String} order_by Allowed values: relevance / mint_date
     * @param {Integer} page_size Required Search query
     * @param {Integer} page_number Required Search query
     */
    async searchNFTs(
      contract,
      text,
      chain,
      sort_order,
      order_by,
      page_size,
      page_number
    ) {
      /* NFT Port API Search */
      const nftPortApi = new nftPort();
      const results = await nftPortApi.nftSearch(
        text,
        contract,
        chain,
        sort_order,
        order_by,
        page_size,
        page_number
      );
      return results;
    },

    /**
     * NFT PORT API - Search NFTs by Image URL and filter by Contract Address
     * @param {String} contract Results will only include NFTs from this contract address.
     * @param {String} imageUrl URL that points to the image that returns a Content-Length and Content-Type header or contains the file extension. Supports .JPG, .JPEG, .PNG, .WebP, .PPM, .BMP, .PGM, .TIF, .TIFF file formats.
     * @param {Integer} page_size Required Search query
     * @param {Integer} page_number Required Search query
     * @param {Number} threshold Threshold for classifying an NFT as a counterfeit. >= 0.1 <= 1 Default: 0.9
     */
    async searchNFTImage(
      contract,
      imageUrl,
      page_size,
      page_number,
      threshold
    ) {
      /* NFT Port API Search */
      const nftPortApi = new nftPort();
      const results = await nftPortApi.nftSearchImage(
        imageUrl,
        contract,
        page_size,
        page_number,
        threshold
      );
      return results;
    },

    /**
     * NFT PORT API - Search NFTs by Token Id and filter by Contract Address
     * @param {String} contract Results will only include NFTs from this contract address.
     * @param {String} contractFilter NFTs from this contract address will be filtered out. Useful for examples where the whole NFT collection is visually very similar e.g. CryptoPunks.
     * @param {String} text
     * @param {String} tokenId A unique uint256 ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
     * @param {String} chain Blockchain where the NFT has been minted. Allowed values: polygon / ethereum / all
     * @param {Integer} page_size Required Search query
     * @param {Integer} page_number Required Search query
     * @param {Number} threshold Threshold for classifying an NFT as a counterfeit. >= 0.1 <= 1 Default: 0.9
     */
    async searchNFTTokenId(
      contract,
      contractFilter,
      tokenId,
      text,
      chain,
      page_size,
      page_number,
      threshold
    ) {
      /* NFT Port API Search */
      const nftPortApi = new nftPort();
      const results = await nftPortApi.nftSearchTokenId(
        contract,
        contractFilter,
        tokenId,
        text,
        chain,
        page_size,
        page_number,
        threshold
      );
      return results;
    },

    /**
     * NFT PORT API - Fetch NFTs by Contract Address
     * @param {String} contract Results will only include NFTs from this contract address.
     * @param {String} chain Allowed values: polygon / ethereum / rinkeby
     * @param {String} include Include optional data in the response. default Allowed values: default / metadata / all
     * @param {Bool} refresh_metadata Queues and refreshes all the NFTs metadata inside the contract (i.e. all tokens)
     * if they have changed since the updated_date. Useful for example, when NFT collections are revealed.
     * @param {Integer} page_size Required Search query
     * @param {Integer} page_number Required Search query
     * @returns {Promise<String|Error>}
     */
    async contractNftSearch(
      contract,
      chain,
      include,
      refresh_metadata,
      page_size,
      page_number
    ) {
      /* NFT Port API Search */
      const nftPortApi = new nftPort();
      const results = await nftPortApi.contractNftSearch(
        contract,
        chain,
        include,
        refresh_metadata,
        page_size,
        page_number
      );
      return results;
    },

    /**
     * NFT PORT API - Fetch NFTs by Account Address
     * @param {String} account Results will only include NFTs from this account address.
     * @param {String} contract Filter by and return NFTs only from the given contract address.
     * @param {String} continuation Continuation. Pass this value from the previous response to fetch the next page.
     * @param {String} chain Allowed values: polygon / ethereum / rinkeby
     * @param {String} include Include optional data in the response. default is the default response and metadata includes NFT metadata, like in Retrieve NFT details, and contract_information includes information of the NFT’s contract.
     * Allowed values: default / metadata / contract_information  Default: default
     * @param {String} exclude Exclude data from the response. erc721 excludes ERC721 tokens and erc1155 excludes ERC1155 tokens. Allowed values: erc721 / erc1155
     * @param {Integer} page_size Required Search query
     */
    async accountNftSearch(
      account,
      contract,
      continuation,
      chain,
      include,
      exclude,
      page_size
    ) {
      /* NFT Port API Search */
      const nftPortApi = new nftPort();
      const results = await nftPortApi.accountNftSearch(
        account,
        contract,
        continuation,
        chain,
        include,
        exclude,
        page_size
      );
      return results;
    },

    /**
     * NFT PORT API - Fetch NFT Details by Contract and Token Id
     * @param {String} contract Results will only include NFTs from this contract address.
     * @param {String} token_id Results will only include NFTs from this contract address.
     * @param {String} chain Allowed values: polygon / ethereum / rinkeby
     * @param {Bool} refresh_metadata Queues and refreshes all the NFTs metadata inside the contract (i.e. all tokens)
     */
    async detailsNftSearch(contract, token_id, chain, refresh_metadata) {
      /* NFT Port API Search */
      const nftPortApi = new nftPort();
      const results = await nftPortApi.detailsNftSearch(
        contract,
        token_id,
        chain,
        refresh_metadata
      );
      return results;
    },
  },
});

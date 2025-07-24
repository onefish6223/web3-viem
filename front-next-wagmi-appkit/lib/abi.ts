// NFTMarket合约ABI（简化版，保留核心方法）
export const NFT_MARKET_ABI = [
    {
      "type": "constructor",
      "inputs": [{"name": "_paymentTokenAddress", "type": "address", "internalType": "address"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyNFT",
      "inputs": [{"name": "_listingId", "type": "uint256", "internalType": "uint256"}],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyNFTWithCallback",
      "inputs": [{"name": "_listingId", "type": "uint256", "internalType": "uint256"}],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "cancelListing",
      "inputs": [{"name": "_listingId", "type": "uint256", "internalType": "uint256"}],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "list",
      "inputs": [
        {"name": "_nftContract", "type": "address", "internalType": "address"},
        {"name": "_tokenId", "type": "uint256", "internalType": "uint256"},
        {"name": "_price", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "listings",
      "inputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "outputs": [
        {"name": "seller", "type": "address", "internalType": "address"},
        {"name": "nftContract", "type": "address", "internalType": "address"},
        {"name": "tokenId", "type": "uint256", "internalType": "uint256"},
        {"name": "price", "type": "uint256", "internalType": "uint256"},
        {"name": "isActive", "type": "bool", "internalType": "bool"}
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "nextListingId",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "paymentToken",
      "inputs": [],
      "outputs": [{"name": "", "type": "address", "internalType": "contract IExtendedERC20"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokensReceived",
      "inputs": [
        {"name": "from", "type": "address", "internalType": "address"},
        {"name": "amount", "type": "uint256", "internalType": "uint256"},
        {"name": "data", "type": "bytes", "internalType": "bytes"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "NFTListed",
      "inputs": [
        {"name": "listingId", "type": "uint256", "indexed": true, "internalType": "uint256"},
        {"name": "seller", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "nftContract", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "tokenId", "type": "uint256", "indexed": false, "internalType": "uint256"},
        {"name": "price", "type": "uint256", "indexed": false, "internalType": "uint256"}
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "NFTListingCancelled",
      "inputs": [{"name": "listingId", "type": "uint256", "indexed": true, "internalType": "uint256"}],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "NFTSold",
      "inputs": [
        {"name": "listingId", "type": "uint256", "indexed": true, "internalType": "uint256"},
        {"name": "buyer", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "seller", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "nftContract", "type": "address", "indexed": false, "internalType": "address"},
        {"name": "tokenId", "type": "uint256", "indexed": false, "internalType": "uint256"},
        {"name": "price", "type": "uint256", "indexed": false, "internalType": "uint256"}
      ],
      "anonymous": false
    }
  ] as const;

// 支付代币ABI（简化版）
export const PAYMENT_TOKEN_ABI = [
    {"type": "constructor", "inputs": [], "stateMutability": "nonpayable"},
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        {"name": "owner", "type": "address", "internalType": "address"},
        {"name": "spender", "type": "address", "internalType": "address"}
      ],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {"name": "spender", "type": "address", "internalType": "address"},
        {"name": "value", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [{"name": "account", "type": "address", "internalType": "address"}],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint8", "internalType": "uint8"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [{"name": "", "type": "string", "internalType": "string"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [{"name": "", "type": "string", "internalType": "string"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        {"name": "to", "type": "address", "internalType": "address"},
        {"name": "value", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        {"name": "from", "type": "address", "internalType": "address"},
        {"name": "to", "type": "address", "internalType": "address"},
        {"name": "value", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferWithCallback",
      "inputs": [
        {"name": "recipient", "type": "address", "internalType": "address"},
        {"name": "amount", "type": "uint256", "internalType": "uint256"},
        {"name": "data", "type": "bytes", "internalType": "bytes"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {"name": "owner", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "spender", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "value", "type": "uint256", "indexed": false, "internalType": "uint256"}
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CallbackFailed",
      "inputs": [
        {"name": "recipient", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "reason", "type": "bytes", "indexed": false, "internalType": "bytes"}
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {"name": "from", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "to", "type": "address", "indexed": true, "internalType": "address"},
        {"name": "value", "type": "uint256", "indexed": false, "internalType": "uint256"}
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "ERC20InsufficientAllowance",
      "inputs": [
        {"name": "spender", "type": "address", "internalType": "address"},
        {"name": "allowance", "type": "uint256", "internalType": "uint256"},
        {"name": "needed", "type": "uint256", "internalType": "uint256"}
      ]
    },
    {
      "type": "error",
      "name": "ERC20InsufficientBalance",
      "inputs": [
        {"name": "sender", "type": "address", "internalType": "address"},
        {"name": "balance", "type": "uint256", "internalType": "uint256"},
        {"name": "needed", "type": "uint256", "internalType": "uint256"}
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidApprover",
      "inputs": [{"name": "approver", "type": "address", "internalType": "address"}]
    },
    {
      "type": "error",
      "name": "ERC20InvalidReceiver",
      "inputs": [{"name": "receiver", "type": "address", "internalType": "address"}]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSender",
      "inputs": [{"name": "sender", "type": "address", "internalType": "address"}]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSpender",
      "inputs": [{"name": "spender", "type": "address", "internalType": "address"}]
    }
  ] as const;
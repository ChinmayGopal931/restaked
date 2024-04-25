const delegationManagerAbi = [
  {
    inputs: [
      {
        internalType: "contract IStrategyManager",
        name: "_strategyManager",
        type: "address",
      },
      { internalType: "contract ISlasher", name: "_slasher", type: "address" },
      {
        internalType: "contract IEigenPodManager",
        name: "_eigenPodManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "previousValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "MinWithdrawalDelayBlocksSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "earningsReceiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegationApprover",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "stakerOptOutWindowBlocks",
            type: "uint32",
          },
        ],
        indexed: false,
        internalType: "struct IDelegationManager.OperatorDetails",
        name: "newOperatorDetails",
        type: "tuple",
      },
    ],
    name: "OperatorDetailsModified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "metadataURI",
        type: "string",
      },
    ],
    name: "OperatorMetadataURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "earningsReceiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegationApprover",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "stakerOptOutWindowBlocks",
            type: "uint32",
          },
        ],
        indexed: false,
        internalType: "struct IDelegationManager.OperatorDetails",
        name: "operatorDetails",
        type: "tuple",
      },
    ],
    name: "OperatorRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "OperatorSharesDecreased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "OperatorSharesIncreased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPausedStatus",
        type: "uint256",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IPauserRegistry",
        name: "pauserRegistry",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IPauserRegistry",
        name: "newPauserRegistry",
        type: "address",
      },
    ],
    name: "PauserRegistrySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "StakerDelegated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "StakerForceUndelegated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "StakerUndelegated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "StrategyWithdrawalDelayBlocksSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPausedStatus",
        type: "uint256",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "withdrawalRoot",
        type: "bytes32",
      },
    ],
    name: "WithdrawalCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "oldWithdrawalRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "newWithdrawalRoot",
        type: "bytes32",
      },
    ],
    name: "WithdrawalMigrated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "withdrawalRoot",
        type: "bytes32",
      },
      {
        components: [
          { internalType: "address", name: "staker", type: "address" },
          { internalType: "address", name: "delegatedTo", type: "address" },
          { internalType: "address", name: "withdrawer", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint32", name: "startBlock", type: "uint32" },
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
        ],
        indexed: false,
        internalType: "struct IDelegationManager.Withdrawal",
        name: "withdrawal",
        type: "tuple",
      },
    ],
    name: "WithdrawalQueued",
    type: "event",
  },
  {
    inputs: [],
    name: "DELEGATION_APPROVAL_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_STAKER_OPT_OUT_WINDOW_BLOCKS",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_WITHDRAWAL_DELAY_BLOCKS",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKER_DELEGATION_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "beaconChainETHStrategy",
    outputs: [
      { internalType: "contract IStrategy", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
    ],
    name: "calculateCurrentStakerDelegationDigestHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "address", name: "_delegationApprover", type: "address" },
      { internalType: "bytes32", name: "approverSalt", type: "bytes32" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
    ],
    name: "calculateDelegationApprovalDigestHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "uint256", name: "_stakerNonce", type: "uint256" },
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
    ],
    name: "calculateStakerDelegationDigestHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "staker", type: "address" },
          { internalType: "address", name: "delegatedTo", type: "address" },
          { internalType: "address", name: "withdrawer", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint32", name: "startBlock", type: "uint32" },
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
        ],
        internalType: "struct IDelegationManager.Withdrawal",
        name: "withdrawal",
        type: "tuple",
      },
    ],
    name: "calculateWithdrawalRoot",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "staker", type: "address" },
          { internalType: "address", name: "delegatedTo", type: "address" },
          { internalType: "address", name: "withdrawer", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint32", name: "startBlock", type: "uint32" },
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
        ],
        internalType: "struct IDelegationManager.Withdrawal",
        name: "withdrawal",
        type: "tuple",
      },
      { internalType: "contract IERC20[]", name: "tokens", type: "address[]" },
      {
        internalType: "uint256",
        name: "middlewareTimesIndex",
        type: "uint256",
      },
      { internalType: "bool", name: "receiveAsTokens", type: "bool" },
    ],
    name: "completeQueuedWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "staker", type: "address" },
          { internalType: "address", name: "delegatedTo", type: "address" },
          { internalType: "address", name: "withdrawer", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint32", name: "startBlock", type: "uint32" },
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
        ],
        internalType: "struct IDelegationManager.Withdrawal[]",
        name: "withdrawals",
        type: "tuple[]",
      },
      {
        internalType: "contract IERC20[][]",
        name: "tokens",
        type: "address[][]",
      },
      {
        internalType: "uint256[]",
        name: "middlewareTimesIndexes",
        type: "uint256[]",
      },
      { internalType: "bool[]", name: "receiveAsTokens", type: "bool[]" },
    ],
    name: "completeQueuedWithdrawals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "cumulativeWithdrawalsQueued",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "decreaseDelegatedShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      {
        components: [
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "uint256", name: "expiry", type: "uint256" },
        ],
        internalType: "struct ISignatureUtils.SignatureWithExpiry",
        name: "approverSignatureAndExpiry",
        type: "tuple",
      },
      { internalType: "bytes32", name: "approverSalt", type: "bytes32" },
    ],
    name: "delegateTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
      {
        components: [
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "uint256", name: "expiry", type: "uint256" },
        ],
        internalType: "struct ISignatureUtils.SignatureWithExpiry",
        name: "stakerSignatureAndExpiry",
        type: "tuple",
      },
      {
        components: [
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "uint256", name: "expiry", type: "uint256" },
        ],
        internalType: "struct ISignatureUtils.SignatureWithExpiry",
        name: "approverSignatureAndExpiry",
        type: "tuple",
      },
      { internalType: "bytes32", name: "approverSalt", type: "bytes32" },
    ],
    name: "delegateToBySignature",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "delegatedTo",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "delegationApprover",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
    ],
    name: "delegationApproverSaltIsSpent",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "domainSeparator",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "earningsReceiver",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eigenPodManager",
    outputs: [
      { internalType: "contract IEigenPodManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "staker", type: "address" }],
    name: "getDelegatableShares",
    outputs: [
      { internalType: "contract IStrategy[]", name: "", type: "address[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      {
        internalType: "contract IStrategy[]",
        name: "strategies",
        type: "address[]",
      },
    ],
    name: "getOperatorShares",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IStrategy[]",
        name: "strategies",
        type: "address[]",
      },
    ],
    name: "getWithdrawalDelay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "increaseDelegatedShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
      {
        internalType: "contract IPauserRegistry",
        name: "_pauserRegistry",
        type: "address",
      },
      { internalType: "uint256", name: "initialPausedStatus", type: "uint256" },
      {
        internalType: "uint256",
        name: "_minWithdrawalDelayBlocks",
        type: "uint256",
      },
      {
        internalType: "contract IStrategy[]",
        name: "_strategies",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_withdrawalDelayBlocks",
        type: "uint256[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "staker", type: "address" }],
    name: "isDelegated",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "isOperator",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
          { internalType: "address", name: "staker", type: "address" },
          {
            components: [
              { internalType: "address", name: "withdrawer", type: "address" },
              { internalType: "uint96", name: "nonce", type: "uint96" },
            ],
            internalType:
              "struct IStrategyManager.DeprecatedStruct_WithdrawerAndNonce",
            name: "withdrawerAndNonce",
            type: "tuple",
          },
          {
            internalType: "uint32",
            name: "withdrawalStartBlock",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "delegatedAddress",
            type: "address",
          },
        ],
        internalType:
          "struct IStrategyManager.DeprecatedStruct_QueuedWithdrawal[]",
        name: "withdrawalsToMigrate",
        type: "tuple[]",
      },
    ],
    name: "migrateQueuedWithdrawals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minWithdrawalDelayBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "earningsReceiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegationApprover",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "stakerOptOutWindowBlocks",
            type: "uint32",
          },
        ],
        internalType: "struct IDelegationManager.OperatorDetails",
        name: "newOperatorDetails",
        type: "tuple",
      },
    ],
    name: "modifyOperatorDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "operatorDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "earningsReceiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegationApprover",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "stakerOptOutWindowBlocks",
            type: "uint32",
          },
        ],
        internalType: "struct IDelegationManager.OperatorDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "contract IStrategy", name: "", type: "address" },
    ],
    name: "operatorShares",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newPausedStatus", type: "uint256" },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "index", type: "uint8" }],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauserRegistry",
    outputs: [
      { internalType: "contract IPauserRegistry", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "pendingWithdrawals",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
          { internalType: "address", name: "withdrawer", type: "address" },
        ],
        internalType: "struct IDelegationManager.QueuedWithdrawalParams[]",
        name: "queuedWithdrawalParams",
        type: "tuple[]",
      },
    ],
    name: "queueWithdrawals",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "earningsReceiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegationApprover",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "stakerOptOutWindowBlocks",
            type: "uint32",
          },
        ],
        internalType: "struct IDelegationManager.OperatorDetails",
        name: "registeringOperatorDetails",
        type: "tuple",
      },
      { internalType: "string", name: "metadataURI", type: "string" },
    ],
    name: "registerAsOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinWithdrawalDelayBlocks",
        type: "uint256",
      },
    ],
    name: "setMinWithdrawalDelayBlocks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPauserRegistry",
        name: "newPauserRegistry",
        type: "address",
      },
    ],
    name: "setPauserRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IStrategy[]",
        name: "strategies",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "withdrawalDelayBlocks",
        type: "uint256[]",
      },
    ],
    name: "setStrategyWithdrawalDelayBlocks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "slasher",
    outputs: [{ internalType: "contract ISlasher", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakerNonce",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "stakerOptOutWindowBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "strategyManager",
    outputs: [
      { internalType: "contract IStrategyManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract IStrategy", name: "", type: "address" }],
    name: "strategyWithdrawalDelayBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "staker", type: "address" }],
    name: "undelegate",
    outputs: [
      { internalType: "bytes32[]", name: "withdrawalRoots", type: "bytes32[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newPausedStatus", type: "uint256" },
    ],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "metadataURI", type: "string" }],
    name: "updateOperatorMetadataURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = { delegationManagerAbi };

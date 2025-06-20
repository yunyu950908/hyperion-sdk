import { gql } from "graphql-request";

export const TokenInfoFragment = `
  assetType
  bridge
  coinMarketcapId
  coinType
  coingeckoId
  decimals
  faType
  hyperfluidSymbol
  logoUrl
  name
  symbol
  isBanned
  websiteUrl`;

export const PoolInfoFragment = `
   currentTick
   feeRate
   feeTier
   poolId
   senderAddress
   sqrtPrice
   token1
   token2
  token1Info {
    ${TokenInfoFragment}
  }
  token2Info {
    ${TokenInfoFragment} 
  }
`;

export const PoolStatFragment = `
  id
  dailyVolumeUSD
  feesUSD
  tvlUSD
  feeAPR
  farmAPR
  pool {
    ${PoolInfoFragment} 
  }
`;

export const QueryAllPools = gql`
  query queryAllPools {
    api {
      getPoolStat {
		    ${PoolStatFragment}
      }
    }
  }
`;

export const QueryPoolById = gql`
  query queryPoolById($poolId: String = "") {
    api {
      getPoolStat(poolId: $poolId) {
	    	${PoolStatFragment}	
      }
    }
  }
`;

export const QueryTickChart = gql`
  query queryTickChart($poolId: String = "") {
    api {
      getLiquidityAccumulation(poolId: $poolId) {
        price0
        price1
        tick
        totalAmount
      }
    }
  }
`;

export const FeeProperties = `
  amount
  amountUSD
  token
`;

export const Claimed = `
  claimed {
    ${FeeProperties}
  }
`;

export const Unclaimed = `
  unclaimed {
    ${FeeProperties}
  }
`;

export const QueryAllPositionByAddress = gql`
  query queryAllPositionByAddress($address: String = "") {
    api {
      getPositionStatsByAddress(address: $address) {
        isActive
        value
        farm {
          ${Claimed} 
          ${Unclaimed}
        }
        fees {
          ${Claimed} 
          ${Unclaimed} 
        }
        position {
          objectId
          poolId
          tickLower
          tickUpper
          createdAt
          pool {
            ${PoolInfoFragment}
          }
        }
      }
    }
  }
`;

export const QueryPoolInfoByObjectId = gql`
  query queryPoolInfoByObjectId($ownerAddress: String = "", $objectId: String = "") {
    objectOwnership(
      where: {
        ownerAddress: { _eq: $ownerAddress }
        isDelete: { _eq: false }
        objectId: { _eq: $objectId }
      }
    ) {
      objectId
      poolId
      txnTimestamp
      currentAmount
      position {
        tickLower
        tickUpper
      }
      pool {
        ${PoolInfoFragment} 
      }
    }
  }
`;

export const queryPoolByTokenPair = gql`
  query queryPoolByTokenPair(
    $token1: String = ""
    $token2: String = ""
    $feeTier: Float = 1.5
  ) {
    api {
      getPoolByTokenPair(feeTier: $feeTier, token1: $token1, token2: $token2) {
        currentTick
        token1
        token2
        poolId
      }
    }
  }
`;

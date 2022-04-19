require("dotenv").config();
var { request } = require("graphql-request");
const { getSystemState } = require("./graphql/services/system-state");

async function AddLiquidity(
  tokenAmounts,
  fees,
  invariant,
  tokenSupply,
  block,
  timestamp,
  poolId,
  providerId,
  transactionHash,
  logIndex,
  registryAddress,
  blockNumber
) {
  console.log("Calling handleAddLiquidity mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleAddLiquidity( 
                $tokenAmounts: String!,
                $fees: String!,
                $invariant: String!,
                $tokenSupply: String!,
                $block: String!,
                $timestamp: String!,
                $poolId: String!,
                $providerId: String!,
                $transactionHash: String!,
                $logIndex: String!,
                $registryAddress: String!,
                $blockNumber: String!,
                ){
              handleAddLiquidity( 
                  tokenAmounts: $tokenAmounts,
                  fees: $fees,
                  invariant: $invariant,
                  tokenSupply: $tokenSupply,
                  block: $block,
                  timestamp: $timestamp,
                  poolId: $poolId,
                  providerId: $providerId,
                  transactionHash: $transactionHash,
                  logIndex: $logIndex,
                  registryAddress: $registryAddress,
                  blockNumber: $blockNumber,
                  ) {
                result
            }
                      
            }`,
    {
      tokenAmounts: tokenAmounts,
      fees: fees,
      invariant: invariant,
      tokenSupply: tokenSupply,
      block: block,
      timestamp: timestamp,
      poolId: poolId,
      providerId: providerId,
      transactionHash: transactionHash,
      logIndex: logIndex,
      registryAddress: registryAddress,
      blockNumber: blockNumber,
    }
  );
  console.log(response);
}

async function RemoveLiquidity(
  tokenAmounts,
  fees,
  tokenSupply,
  block,
  timestamp,
  poolId,
  providerId,
  transactionHash,
  logIndex,
  registryAddress,
  blockNumber
) {
  console.log("Calling handleAddLiquidity mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleRemoveLiquidity( 
                $tokenAmounts: String!,
                $fees: String!,
                $tokenSupply: String!,
                $block: String!,
                $timestamp: String!,
                $poolId: String!,
                $providerId: String!,
                $transactionHash: String!,
                $logIndex: String!,
                $registryAddress: String!,
                $blockNumber: String!,
                ){
              handleRemoveLiquidity( 
                  tokenAmounts: $tokenAmounts,
                  fees: $fees,
                  tokenSupply: $tokenSupply,
                  block: $block,
                  timestamp: $timestamp,
                  poolId: $poolId,
                  providerId: $providerId,
                  transactionHash: $transactionHash,
                  logIndex: $logIndex,
                  registryAddress: $registryAddress,
                  blockNumber: $blockNumber,
                  ) {
                result
            }
                      
            }`,
    {
      tokenAmounts: tokenAmounts,
      fees: fees,
      tokenSupply: tokenSupply,
      block: block,
      timestamp: timestamp,
      poolId: poolId,
      providerId: providerId,
      transactionHash: transactionHash,
      logIndex: logIndex,
      registryAddress: registryAddress,
      blockNumber: blockNumber,
    }
  );
  console.log(response);
}

async function RemoveLiquidityImbalance(
  tokenAmounts,
  fees,
  invariant,
  tokenSupply,
  block,
  timestamp,
  poolId,
  providerId,
  transactionHash,
  logIndex,
  registryAddress,
  blockNumber
) {
  console.log("Calling handleRemoveLiquidityImbalance mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleRemoveLiquidityImbalance( 
                $tokenAmounts: String!,
                $fees: String!,
                $invariant: String!,
                $tokenSupply: String!,
                $block: String!,
                $timestamp: String!,
                $poolId: String!,
                $providerId: String!,
                $transactionHash: String!,
                $logIndex: String!,
                $registryAddress: String!,
                $blockNumber: String!,
                ){
              handleRemoveLiquidityImbalance( 
                  tokenAmounts: $tokenAmounts,
                  fees: $fees,
                  invariant: $invariant,
                  tokenSupply: $tokenSupply,
                  block: $block,
                  timestamp: $timestamp,
                  poolId: $poolId,
                  providerId: $providerId,
                  transactionHash: $transactionHash,
                  logIndex: $logIndex,
                  registryAddress: $registryAddress,
                  blockNumber: $blockNumber,
                  ) {
                result
            }
                      
            }`,
    {
      tokenAmounts: tokenAmounts,
      fees: fees,
      invariant: invariant,
      tokenSupply: tokenSupply,
      block: block,
      timestamp: timestamp,
      poolId: poolId,
      providerId: providerId,
      transactionHash: transactionHash,
      logIndex: logIndex,
      registryAddress: registryAddress,
      blockNumber: blockNumber,
    }
  );
  console.log(response);
}

async function RemoveLiquidityOne(
  tokenAmount,
  coinAmount,
  block,
  timestamp,
  poolId,
  providerId,
  transactionHash,
  logIndex,
  registryAddress,
  blockNumber
) {
  console.log("Calling handleRemoveLiquidityOne mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleRemoveLiquidityOne( 
                $tokenAmount: String!,
                $coinAmount: String!,
                $block: String!,
                $timestamp: String!,
                $poolId: String!,
                $providerId: String!,
                $transactionHash: String!,
                $logIndex: String!,
                $registryAddress: String!,
                $blockNumber: String!,
                ){
              handleRemoveLiquidityOne( 
                  tokenAmount: $tokenAmount,
                  coinAmount: $coinAmount,
                  block: $block,
                  timestamp: $timestamp,
                  poolId: $poolId,
                  providerId: $providerId,
                  transactionHash: $transactionHash,
                  logIndex: $logIndex,
                  registryAddress: $registryAddress,
                  blockNumber: $blockNumber,
                  ) {
                result
            }
                      
            }`,
    {
      tokenAmount: tokenAmount,
      coinAmount: coinAmount,
      block: block,
      timestamp: timestamp,
      poolId: poolId,
      providerId: providerId,
      transactionHash: transactionHash,
      logIndex: logIndex,
      registryAddress: registryAddress,
      blockNumber: blockNumber,
    }
  );
  console.log(response);
}


async function TokenExchange(
  poolId, transactionHash, block, timestamp, logIndex, buyer, sold_id, tokens_sold, bought_id, tokens_bought
  ) {
  console.log("Calling handleTokenExchange mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleTokenExchange( 
              $poolId: String!,
              $transactionHash: String!,
              $block: String!,
              $timestamp: String!,
              $logIndex: String!,
              $buyer: String!,
              $sold_id: String!,
              $tokens_sold: String!,
              $bought_id: String!,
              $tokens_bought: String!
              ){
                  handleTokenExchange( 
                poolId: $poolId,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                logIndex: $logIndex,
                buyer: $buyer,
                sold_id: $sold_id,
                tokens_sold: $tokens_sold,
                bought_id: $bought_id,
                tokens_bought: $tokens_bought
                ) {
              result
          }
                    
          }`,
    {
      poolId: poolId,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
      logIndex: logIndex,
      buyer: buyer,
      sold_id: sold_id,
      tokens_sold: tokens_sold,
      bought_id: bought_id,
      tokens_bought: tokens_bought
    }
  );
  console.log(response);
}

async function TokenExchangeUnderlying(
  poolId, transactionHash, block, timestamp, logIndex, buyer, sold_id, tokens_sold, bought_id, tokens_bought
  ) {
  console.log("Calling handleTokenExchangeUnderlying mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleTokenExchangeUnderlying( 
              $poolId: String!,
              $transactionHash: String!,
              $block: String!,
              $timestamp: String!,
              $logIndex: String!,
              $buyer: String!,
              $sold_id: String!,
              $tokens_sold: String!,
              $bought_id: String!,
              $tokens_bought: String!,
              ){
                  handleTokenExchangeUnderlying( 
                poolId: $poolId,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                logIndex: $logIndex,
                buyer: $buyer,
                sold_id: $sold_id,
                tokens_sold: $tokens_sold,
                bought_id: $bought_id,
                tokens_bought: $tokens_bought
                ) {
              result
          }
                    
          }`,
    {
      poolId: poolId,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
      logIndex: logIndex,
      buyer: buyer,
      sold_id: sold_id,
      tokens_sold: tokens_sold,
      bought_id: bought_id,
      tokens_bought: tokens_bought
    }
  );
  console.log(response);
}

async function NewAdmin(
  poolId, transactionHash, block, timestamp, logIndex, admin
  ) {
  console.log("Calling handleNewAdmin mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewAdmin( 
              $poolId: String!,
              $transactionHash: String!,
              $block: String!,
              $timestamp: String!,
              $logIndex: String!,
              $admin: String!,
              ){
                  handleNewAdmin( 
                poolId: $poolId,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                logIndex: $logIndex,
                admin: $admin,
                ) {
              result
          }
                    
          }`,
    {
      poolId: poolId,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
      logIndex: logIndex,
      admin: admin,
    }
  );
  console.log(response);
}

async function NewFee(
  poolId, transactionHash, block, timestamp, logIndex,fee, admin_fee
  ) {
  console.log("Calling handleNewFee mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewFee( 
              $poolId: String!,
              $transactionHash: String!,
              $block: String!,
              $timestamp: String!,
              $logIndex: String!,
              $fee: String!,
              $admin_fee: String!,
              ){
                  handleNewFee( 
                poolId: $poolId,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                logIndex: $logIndex,
                fee: $fee,
                admin_fee: $admin_fee,
                ) {
              result
          }
                    
          }`,
    {
      poolId: poolId,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
      logIndex: logIndex,
      fee: fee,
      admin_fee: admin_fee
    }
  );
  console.log(response);
}

async function NewParameters(
  poolId,A, transactionHash, block, timestamp, logIndex,fee, admin_fee
  ) {
  console.log("Calling handleNewParameters mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewParameters( 
              $poolId: String!,
              $A: String!,
              $transactionHash: String!,
              $block: String!,
              $timestamp: String!,
              $logIndex: String!,
              $fee: String!,
              $admin_fee: String!,
              ){
                  handleNewParameters( 
                poolId: $poolId,
                A: $A ,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                logIndex: $logIndex,
                fee: $fee,
                admin_fee: $admin_fee,
                ) {
              result
          }
                    
          }`,
    {
      poolId: poolId,
      A: A,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
      logIndex: logIndex,
      fee: fee,
      admin_fee: admin_fee
    }
  );
  console.log(response);
}

async function RampA(
  poolId,new_A, transactionHash, block, timestamp, logIndex,
  ) {
  console.log("Calling handleRampA mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleRampA( 
              $poolId: String!,
              $new_A: String!,
              $transactionHash: String!,
              $block: String!,
              $timestamp: String!,
              $logIndex: String!,
              ){
                  handleRampA( 
                poolId: $poolId,
                new_A: $new_A ,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                logIndex: $logIndex,
                ) {
              result
          }
                    
          }`,
    {
      poolId: poolId,
      new_A: new_A,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
      logIndex: logIndex,
    }
  );
  console.log(response);
}

async function StopRampA(
  poolId,A, transactionHash, block, timestamp, logIndex,
  ) {
  console.log("Calling handleStopRampA mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleStopRampA( 
              $poolId: String!,
              $A: String!,
              $transactionHash: String!,
              $block: String!,
              $timestamp: String!,
              $logIndex: String!,
              ){
                  handleStopRampA( 
                poolId: $poolId,
                A: $A ,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                logIndex: $logIndex,
                ) {
              result
          }
                    
          }`,
    {
      poolId: poolId,
      A: A,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
      logIndex: logIndex,
    }
  );
  console.log(response);
}


async function callGetSystemState(
  addressProviderContractHash,
  id,
  block,
  timestamp,
  transactionHash
) {
  let args = {
    addressProviderContractHash: addressProviderContractHash,
    id: id,
    block: block,
    timestamp: timestamp,
    transactionHash: transactionHash,
  };
  console.log("Calling getSystemState function...");
  let response = await getSystemState(args);
  console.log(response);
}

async function AddressModified(
  addressProviderContractHash,
  id,
  block,
  timestamp,
  transactionHash
) {
  console.log("Calling handleAddressModified mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleAddressModified( 
                $addressProviderContractHash: String!,
                $id: String!,
                $block: String!,
                $timestamp: String!,
                $transactionHash: String!,
                ){
                    handleAddressModified( 
                  addressProviderContractHash: $addressProviderContractHash,
                  id: $id,
                  block: $block,
                  timestamp: $timestamp,
                  transactionHash: $transactionHash,
                  ) {
                result
            }
                      
            }`,
    {
      addressProviderContractHash: addressProviderContractHash,
      id: id,
      block: block,
      timestamp: timestamp,
      transactionHash: transactionHash,
    }
  );
  console.log(response);
}

async function NewAddressIdentifier(
  addressProviderContractHash,
  id,
  block,
  timestamp,
  transactionHash
) {
  console.log("Calling handleNewAddressIdentifier mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewAddressIdentifier( 
                $addressProviderContractHash: String!,
                $id: String!,
                $block: String!,
                $timestamp: String!,
                $transactionHash: String!,
                ){
                    handleNewAddressIdentifier( 
                  addressProviderContractHash: $addressProviderContractHash,
                  id: $id,
                  block: $block,
                  timestamp: $timestamp,
                  transactionHash: $transactionHash,
                  ) {
                result
            }
                      
            }`,
    {
      addressProviderContractHash: addressProviderContractHash,
      id: id,
      block: block,
      timestamp: timestamp,
      transactionHash: transactionHash,
    }
  );
  console.log(response);
}

async function AddType(id, type_id, timestamp) {
  console.log("Calling handleAddType mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleAddType( 
                $id: String!,
                $type_id: String!,
                $timestamp: String!,
                ){
                    handleAddType( 
                  id: $id,
                  type_id: $type_id,
                  timestamp: $timestamp,
                  ) {
                result
            }
                      
            }`,
    {
      id: id,
      type_id: type_id,
      timestamp: timestamp,
    }
  );
  console.log(response);
}

// async function NewGauge(
//   gauge_type,
//   timestamp,
//   addr,
//   blockNumber,
//   transactionHash,
//   weight
// ) {
//   console.log("Calling handleNewGauge mutation...");
//   let response = await request(
//     process.env.GRAPHQL,
//     `mutation handleNewGauge( 
//                         $gauge_type: String!,
//                         $timestamp: String!,
//                         $addr: String!,
//                         $blockNumber: String!,
//                         $transactionHash: String!,
//                         $weight: String!,

//                 ){
//                     handleNewGauge( 
//                         gauge_type: $gauge_type,
//                         timestamp: $timestamp,
//                         addr: $addr,
//                         blockNumber: $blockNumber,
//                         transactionHash: $transactionHash,
//                         weight: $weight,
//                   ) {
//                 result
//             }
                      
//             }`,
//     {
//       gauge_type: gauge_type,
//       timestamp: timestamp,
//       addr: addr,
//       blockNumber: blockNumber,
//       transactionHash: transactionHash,
//       weight: weight,
//     }
//   );
//   console.log(response);
// }

async function NewGauge(
  gaugeType,
  addr,
  blockNumber,
  transactionHash,
  weight,
  timestamp
) {
  console.log("Calling handleNewGauge mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewGauge(
                $gaugeType: String!,
                $addr: String!,
                $blockNumber: String!,
                $transactionHash: String!,
                $weight: String!,
                $timestamp: String!,
                ){
                    handleNewGauge(
                      gaugeType: $gaugeType,
                      addr: $addr,
                      blockNumber: $blockNumber,
                      transactionHash: $transactionHash,
                      weight: $weight,
                      timestamp: $timestamp,
                  ) {
                result
            }
            }`,
    {
      gaugeType: gaugeType,
      addr: addr,
      blockNumber: blockNumber,
      transactionHash: transactionHash,
      weight: weight,
      timestamp: timestamp,
    }
  );
  console.log(response);
}

async function NewGaugeWeight(id, time, weight, gauge_address) {
  console.log("Calling handleNewGaugeWeight mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewGaugeWeight( 
               $id: String!,
               $time: String!,
               $weight: String!,
               $gauge_address: String!,

               ){
                handleNewGaugeWeight( 
                 id: $id,
                 time: $time,
                 weight: $weight,
                 gauge_address: $gauge_address,
                 ) {
               result
           }
                     
           }`,
    {
      id: id,
      time: time,
      weight: weight,
      gauge_address: gauge_address,
    }
  );
  console.log(response);
}

async function NewTypeWeight(id, time, weight, type_id, total_weight) {
  console.log("Calling handleNewTypeWeight mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewTypeWeight( 
               $id: String!,
               $time: String!,
               $weight: String!,
               $type_id: String!,
               $total_weight: String!

               ){
                handleNewTypeWeight( 
                 id: $id,
                 time: $time,
                 weight: $weight,
                 type_id: $type_id,
                 total_weight: $total_weight
                 ) {
               result
           }
                     
           }`,
    {
      id: id,
      time: time,
      weight: weight,
      type_id: type_id,
      total_weight: total_weight,
    }
  );
  console.log(response);
}

async function VoteForGauge(id, time, weight, gauge_addr, user) {
  console.log("Calling handleVoteForGauge mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleVoteForGauge( 
               $id: String!,
               $time: String!,
               $weight: String!,
               $gauge_addr: String!,
               $user: String!

               ){
                handleVoteForGauge( 
                 id: $id,
                 time: $time,
                 weight: $weight,
                 gauge_addr: $gauge_addr,
                 user: $user
                 ) {
               result
           }
                     
           }`,
    {
      id: id,
      time: time,
      weight: weight,
      gauge_addr: gauge_addr,
      user: user,
    }
  );
  console.log(response);
}

async function UpdateLiquidityLimit(
  user,
  id,
  original_balance,
  original_supply,
  working_balance,
  working_supply,
  transactionHash,
  block,
  timestamp
) {
  console.log("Calling handleUpdateLiquidityLimit mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleUpdateLiquidityLimit( 
            $user: String!,
            $id: String!,
            $original_balance: String!,
            $original_supply: String!,
            $working_balance: String!,
            $working_supply: String!,
            $transactionHash: String!,
            $block: String!
            $timestamp: String!,
            ){
                handleUpdateLiquidityLimit( 
              user: $user,
              id: $id,
              original_balance: $original_balance,
              original_supply: $original_supply,
              working_balance: $working_balance,
              working_supply: $working_supply,
              transactionHash: $transactionHash,
              block: $block,
              timestamp: $timestamp,
              ) {
            result
        }
                  
        }`,
    {
      user: user,
      id: id,
      original_balance: original_balance,
      original_supply: original_supply,
      working_balance: working_balance,
      working_supply: working_supply,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
    }
  );
  console.log(response);
}

async function Deposit(provider, id, value, transactionHash, logIndex) {
  console.log("Calling handleDeposit mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleDeposit( 
               $provider: String!,
               $id: String!,
               $value: String!,
               $transactionHash: String!,
               $logIndex: String!

               ){
                handleDeposit( 
                 provider: $provider,
                 id: $id,
                 value: $value,
                 transactionHash: $transactionHash,
                 logIndex: $logIndex
                 ) {
               result
           }
                     
           }`,
    {
      provider: provider,
      id: id,
      value: value,
      transactionHash: transactionHash,
      logIndex: logIndex,
    }
  );
  console.log(response);
}

async function Withdraw(provider, id, value, transactionHash, logIndex) {
  console.log("Calling handleWithdraw mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleWithdraw( 
               $provider: String!,
               $id: String!,
               $value: String!,
               $transactionHash: String!,
               $logIndex: String!

               ){
                handleWithdraw( 
                 provider: $provider,
                 id: $id,
                 value: $value,
                 transactionHash: $transactionHash,
                 logIndex: $logIndex
                 ) {
               result
           }
                     
           }`,
    {
      provider: provider,
      id: id,
      value: value,
      transactionHash: transactionHash,
      logIndex: logIndex,
    }
  );
  console.log(response);
}

async function NewProxyApp(
  appId,
  proxy,
  context,
  transactionHash,
  block,
  timestamp
) {
  console.log("Calling handleNewProxyApp mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleNewProxyApp( 
               $appId: String!,
               $proxy: String!,
               $context: String!,
               $transactionHash: String!,
               $block: String!,
               $timestamp: String!

               ){
                handleNewProxyApp( 
                 appId: $appId,
                 proxy: $proxy,
                 context: $context,
                 transactionHash: $transactionHash,
                 block: $block,
                 timestamp: $timestamp
                 ) {
               result
           }
                     
           }`,
    {
      appId: appId,
      proxy: proxy,
      context: context,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
    }
  );
  console.log(response);
}

async function PoolAdded(poolId, transactionHash, block, timestamp) {
  console.log("Calling handlePoolAdded mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handlePoolAdded( 
               $poolId: String!,
               $transactionHash: String!,
               $block: String!,
               $timestamp: String!

               ){
                handlePoolAdded( 
                 poolId: $poolId,
                 transactionHash: $transactionHash,
                 block: $block,
                 timestamp: $timestamp
                 ) {
               result
           }
                     
           }`,
    {
      poolId: poolId,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
    }
  );
  console.log(response);
}

async function PoolRemoved(poolId, transactionHash, block, timestamp) {
  console.log("Calling handlePoolRemoved mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handlePoolRemoved( 
               $poolId: String!,
               $transactionHash: String!,
               $block: String!,
               $timestamp: String!

               ){
                handlePoolRemoved( 
                 poolId: $poolId,
                 transactionHash: $transactionHash,
                 block: $block,
                 timestamp: $timestamp
                 ) {
               result
           }
                     
           }`,
    {
      poolId: poolId,
      transactionHash: transactionHash,
      block: block,
      timestamp: timestamp,
    }
  );
  console.log(response);
}

async function MinimumBalanceSet(address, minBalance) {
  console.log("Calling handleMinimumBalanceSet mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleMinimumBalanceSet( 
               $address: String!,
               $minBalance: String!,

               ){
                handleMinimumBalanceSet( 
                 address: $address,
                 minBalance: $minBalance,
                 ) {
               result
           }
                     
           }`,
    {
      address: address,
      minBalance: minBalance,
    }
  );
  console.log(response);
}

async function MinimumTimeSet(address, minTime) {
  console.log("Calling handleMinimumTimeSet mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleMinimumTimeSet( 
               $address: String!,
               $minTime: String!,

               ){
                handleMinimumTimeSet( 
                 address: $address,
                 minTime: $minTime,
                 ) {
               result
           }
                     
           }`,
    {
      address: address,
      minTime: minTime,
    }
  );
  console.log(response);
}

async function ChangeMinQuorum(address, minAcceptQuorumPct) {
  console.log("Calling handleChangeMinQuorum mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleChangeMinQuorum( 
               $address: String!,
               $minAcceptQuorumPct: String!,

               ){
                handleChangeMinQuorum( 
                 address: $address,
                 minAcceptQuorumPct: $minAcceptQuorumPct,
                 ) {
               result
           }
                     
           }`,
    {
      address: address,
      minAcceptQuorumPct: minAcceptQuorumPct,
    }
  );
  console.log(response);
}

async function ChangeSupportRequired(address, supportRequiredPct) {
  console.log("Calling handleChangeSupportRequired mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleChangeSupportRequired( 
               $address: String!,
               $supportRequiredPct: String!,

               ){
                handleChangeSupportRequired( 
                 address: $address,
                 supportRequiredPct: $supportRequiredPct,
                 ) {
               result
           }
                     
           }`,
    {
      address: address,
      supportRequiredPct: supportRequiredPct,
    }
  );
  console.log(response);
}

async function StartVote(
  address,
  creator,
  voteId,
  metadata,
  creatorVotingPower,
  timestamp,
  block,
  transactionHash
) {
  console.log("Calling handleStartVote mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleStartVote( 
                $address: String!,
                $creator: String!,
                $voteId: String!,
                $metadata: String!,
                $creatorVotingPower: String!,
                $timestamp: String!,
                $block: String!,
                $transactionHash: String!,
                ){
                    handleStartVote( 
                  address: $address,
                  creator: $creator,
                  voteId: $voteId,
                  metadata: $metadata,
                  creatorVotingPower: $creatorVotingPower,
                  timestamp: $timestamp,
                  block: $block,
                  transactionHash: $transactionHash,
                  ) {
                result
            }
                      
            }`,
    {
      address: address,
      creator: creator,
      voteId: voteId,
      metadata: metadata,
      creatorVotingPower: creatorVotingPower,
      timestamp: timestamp,
      block: block,
      transactionHash: transactionHash,
    }
  );
  console.log(response);
}

async function CastVote(
  address,
  voteId,
  voter,
  stake,
  supports,
  timestamp,
  block,
  transactionHash,
  logIndex
) {
  console.log("Calling handleCastVote mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleCastVote( 
                $address: String!,
                $voteId: String!,
                $voter: String!,
                $stake: String!,
                $supports: String!,
                $timestamp: String!,
                $block: String!,
                $transactionHash: String!,
                $logIndex: String!
                ){
                    handleCastVote( 
                  address: $address,
                  voteId: $voteId,
                  voter: $voter,
                  stake: $stake,
                  supports: $supports,
                  timestamp: $timestamp,
                  block: $block,
                  transactionHash: $transactionHash,
                  logIndex: $logIndex
                  ) {
                result
            }
                      
            }`,
    {
      address: address,
      voteId: voteId,
      voter: voter,
      stake: stake,
      supports: supports,
      timestamp: timestamp,
      block: block,
      transactionHash: transactionHash,
      logIndex: logIndex,
    }
  );
  console.log(response);
}

async function ExecuteVote(address, voteId, timestamp, block, transactionHash) {
  console.log("Calling handleExecuteVote mutation...");
  let response = await request(
    process.env.GRAPHQL,
    `mutation handleExecuteVote( 
                $address: String!,
                $voteId: String!,
                $timestamp: String!,
                $block: String!,
                $transactionHash: String!,
                ){
                    handleExecuteVote( 
                  address: $address,
                  voteId: $voteId,
                  timestamp: $timestamp,
                  block: $block,
                  transactionHash: $transactionHash,
                  ) {
                result
            }
                      
            }`,
    {
      address: address,
      voteId: voteId,
      timestamp: timestamp,
      block: block,
      transactionHash: transactionHash,
    }
  );
  console.log(response);
}

async function startTests() {
  // await AddLiquidity(
  //   "123",
  //   "1",
  //   "1",
  //   "1",
  //   "1",
  //   "1",
  //   "123",
  //   "1",
  //   "1",
  //   "1",
  //   "1",
  //   "1"
  // );
   //await RemoveLiquidity('1','1','1','1','1','123','1','1','1','1','1');
   //await RemoveLiquidityImbalance('1','1','1','1','1','1','123','1','1','1','1','1');
   //await RemoveLiquidityOne('1','1','1','1','123','13344','1','1','1','1');
  //await TokenExchange("123", "123", "123", "123", "123", "123", "123", "123", "123","1234");
  //await TokenExchangeUnderlying("123", "123", "123", "123", "123", "123", "123", "123", "123","1234");
  //await NewAdmin("123", "123", "1000000000", "123", "123","1234");
 // await NewFee("123", "123", "1000000000", "123", "123","1234","123327");
  //await NewParameters("123", "123", "1000000000", "1233498729837489237", "123","1234","123327","123566");
 //await RampA("123333", "123", "1000000000", "123", "123","123");
 //await StopRampA("123333", "123", "1000000000", "123", "123","123");



  //AddressProvider mutations
  // await AddressModified("123", "123", "123", "123", "123");
  // await NewAddressIdentifier("123", "123", "123", "123", "123");

  //Gauge mutations
  // await UpdateLiquidityLimit("123", "123", "123", "123", "123", "123", "123", "123", "123");
  // await Deposit("123", "123", "123", "123", "123");
  // await Withdraw("123", "123", "123", "123", "123");

  // //DAO mutations
  // await NewProxyApp("0x2436adbbb3230545df6846695013211d36736f647c91b302b9591e5e2d013485", "123", "123", "123", "123","123");

  // //voting mutations
   //await StartVote("123","123","123","123","123","123","123","123");
   //await MinimumBalanceSet("12344","123");
   //await MinimumTimeSet("1234489","123787");
   //await ChangeMinQuorum("1234421","1000000000");
   //await ChangeSupportRequired("12344219091","1000000000");
   //await CastVote("12345678","123","123","123","123","123","123","123","123");
   //await ExecuteVote("123","123","123","123","123");

  // Gauge-Controller mutations
  //await AddType('122','1238923','123447383829');
  //await NewGauge("123", "12344332", "12390909", "1232343224", "123758997", "1230900000");
  //await NewGaugeWeight("123454", "1231111", "12322222", "122222222")
  //await NewTypeWeight("12346336444", "123444",'122442','1256454321','12344212123456');
 // await VoteForGauge("1", "1", "1", "1","1");

 //Registry-mutations
 await PoolAdded('123','123','123','123')
 
}

startTests();

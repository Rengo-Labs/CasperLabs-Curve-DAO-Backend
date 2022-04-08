// require("dotenv").config();
// var { request } = require("graphql-request");


// async function AddLiquidity(
//     tokenAmounts, fees, invariant, tokenSupply, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
//     ) {
//     console.log("Calling handleAddLiquidity mutation...");
//     let response = await request(
//       process.env.GRAPHQL,
//       `mutation handleAddLiquidity( 
//                 $tokenAmounts: String!,
//                 $fees: String!,
//                 $invariant: String!,
//                 $tokenSupply: String!,
//                 $block: String!,
//                 $timestamp: String!,
//                 $poolId: String!,
//                 $providerId: String!,
//                 $transactionHash: String!,
//                 $logIndex: String!,
//                 $registryAddress: String!,
//                 $blockNumber: String!,
//                 ){
//               handleAddLiquidity( 
//                   tokenAmounts: $tokenAmounts,
//                   fees: $fees,
//                   invariant: $invariant,
//                   tokenSupply: $tokenSupply,
//                   block: $block,
//                   timestamp: $timestamp,
//                   poolId: $poolId,
//                   providerId: $providerId,
//                   transactionHash: $transactionHash,
//                   logIndex: $logIndex,
//                   registryAddress: $registryAddress,
//                   blockNumber: $blockNumber,
//                   ) {
//                 result
//             }
                      
//             }`,
//       {
//         tokenAmounts: tokenAmounts,
//         fees: fees,
//         invariant: invariant,
//         tokenSupply: tokenSupply,
//         block: block,
//         timestamp: timestamp,
//         poolId: poolId,
//         providerId: providerId,
//         transactionHash: transactionHash,
//         logIndex: logIndex,
//         registryAddress: registryAddress,
//         blockNumber: blockNumber
//       }
//     );
//     console.log(response);
//   }


// async function RemoveLiquidity(
//         tokenAmounts, fees, tokenSupply, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
//     ) {
//     console.log("Calling handleAddLiquidity mutation...");
//     let response = await request(
//       process.env.GRAPHQL,
//       `mutation handleRemoveLiquidity( 
//                 $tokenAmounts: String!,
//                 $fees: String!,
//                 $tokenSupply: String!,
//                 $block: String!,
//                 $timestamp: String!,
//                 $poolId: String!,
//                 $providerId: String!,
//                 $transactionHash: String!,
//                 $logIndex: String!,
//                 $registryAddress: String!,
//                 $blockNumber: String!,
//                 ){
//               handleRemoveLiquidity( 
//                   tokenAmounts: $tokenAmounts,
//                   fees: $fees,
//                   tokenSupply: $tokenSupply,
//                   block: $block,
//                   timestamp: $timestamp,
//                   poolId: $poolId,
//                   providerId: $providerId,
//                   transactionHash: $transactionHash,
//                   logIndex: $logIndex,
//                   registryAddress: $registryAddress,
//                   blockNumber: $blockNumber,
//                   ) {
//                 result
//             }
                      
//             }`,
//       {
//         tokenAmounts: tokenAmounts,
//         fees: fees,
//         tokenSupply: tokenSupply,
//         block: block,
//         timestamp: timestamp,
//         poolId: poolId,
//         providerId: providerId,
//         transactionHash: transactionHash,
//         logIndex: logIndex,
//         registryAddress: registryAddress,
//         blockNumber: blockNumber
//       }
//     );
//     console.log(response);
// }

// async function RemoveLiquidityImbalance(
//     tokenAmounts, fees, invariant, tokenSupply, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
//     ) {
//     console.log("Calling handleRemoveLiquidityImbalance mutation...");
//     let response = await request(
//       process.env.GRAPHQL,
//       `mutation handleRemoveLiquidityImbalance( 
//                 $tokenAmounts: String!,
//                 $fees: String!,
//                 $invariant: String!,
//                 $tokenSupply: String!,
//                 $block: String!,
//                 $timestamp: String!,
//                 $poolId: String!,
//                 $providerId: String!,
//                 $transactionHash: String!,
//                 $logIndex: String!,
//                 $registryAddress: String!,
//                 $blockNumber: String!,
//                 ){
//               handleRemoveLiquidityImbalance( 
//                   tokenAmounts: $tokenAmounts,
//                   fees: $fees,
//                   invariant: $invariant,
//                   tokenSupply: $tokenSupply,
//                   block: $block,
//                   timestamp: $timestamp,
//                   poolId: $poolId,
//                   providerId: $providerId,
//                   transactionHash: $transactionHash,
//                   logIndex: $logIndex,
//                   registryAddress: $registryAddress,
//                   blockNumber: $blockNumber,
//                   ) {
//                 result
//             }
                      
//             }`,
//       {
//         tokenAmounts: tokenAmounts,
//         fees: fees,
//         invariant: invariant,
//         tokenSupply: tokenSupply,
//         block: block,
//         timestamp: timestamp,
//         poolId: poolId,
//         providerId: providerId,
//         transactionHash: transactionHash,
//         logIndex: logIndex,
//         registryAddress: registryAddress,
//         blockNumber: blockNumber
//       }
//     );
//     console.log(response);
// }

// async function RemoveLiquidityOne(
//     tokenAmount, coinAmount, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
//     ) {
//     console.log("Calling handleRemoveLiquidityOne mutation...");
//     let response = await request(
//       process.env.GRAPHQL,
//       `mutation handleRemoveLiquidityOne( 
//                 $tokenAmount: String!,
//                 $coinAmount: String!,
//                 $block: String!,
//                 $timestamp: String!,
//                 $poolId: String!,
//                 $providerId: String!,
//                 $transactionHash: String!,
//                 $logIndex: String!,
//                 $registryAddress: String!,
//                 $blockNumber: String!,
//                 ){
//               handleRemoveLiquidityOne( 
//                   tokenAmount: $tokenAmount,
//                   coinAmount: $coinAmount,
//                   block: $block,
//                   timestamp: $timestamp,
//                   poolId: $poolId,
//                   providerId: $providerId,
//                   transactionHash: $transactionHash,
//                   logIndex: $logIndex,
//                   registryAddress: $registryAddress,
//                   blockNumber: $blockNumber,
//                   ) {
//                 result
//             }
                      
//             }`,
//       {
//         tokenAmount: tokenAmount,
//         coinAmount: coinAmount,
//         block: block,
//         timestamp: timestamp,
//         poolId: poolId,
//         providerId: providerId,
//         transactionHash: transactionHash,
//         logIndex: logIndex,
//         registryAddress: registryAddress,
//         blockNumber: blockNumber
//       }
//     );
//     console.log(response);
//   }

// async function startTests(){
//     await AddLiquidity('1','1','1','1','1','1','1','1','1','1','1','1');
//     // await RemoveLiquidity('1','1','1','1','1','1','1','1','1','1','1');
//     // await RemoveLiquidityImbalance('1','1','1','1','1','1','1','1','1','1','1','1');
//     // await RemoveLiquidityOne('1','1','1','1','1','1','1','1','1','1');
    
// }

// startTests();



require("dotenv").config();
var { request } = require("graphql-request");


async function AddLiquidity(
    tokenAmounts, fees, invariant, tokenSupply, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
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
        blockNumber: blockNumber
      }
    );
    console.log(response);
  }


async function RemoveLiquidity(
        tokenAmounts, fees, tokenSupply, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
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
        blockNumber: blockNumber
      }
    );
    console.log(response);
}

async function RemoveLiquidityImbalance(
    tokenAmounts, fees, invariant, tokenSupply, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
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
        blockNumber: blockNumber
      }
    );
    console.log(response);
}

async function RemoveLiquidityOne(
    tokenAmount, coinAmount, block, timestamp, poolId, providerId, transactionHash, logIndex, registryAddress, blockNumber
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
        blockNumber: blockNumber
      }
    );
    console.log(response);
}

async function AddressModified(
    addressProviderContractHash, id, block, timestamp, transactionHash,
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
    addressProviderContractHash, id, block, timestamp, transactionHash,
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

async function AddType(
     id,type_id, timestamp
    ) {
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

async function NewGauge(
    gauge_type, timestamp,addr,blockNumber, transactionHash, weight
    ) {
    console.log("Calling handleNewGauge mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewGauge( 
                        $gauge_type: String!,
                        $timestamp: String!,
                        $addr: String!,
                        $blockNumber: String!,
                        $transactionHash: String!,
                        $weight: String!,

                ){
                    handleNewGauge( 
                        gauge_type: $gauge_type,
                        timestamp: $timestamp,
                        addr: $addr,
                        blockNumber: $blockNumber,
                        transactionHash: $transactionHash,
                        weight: $weight,
                  ) {
                result
            }
                      
            }`,
      {
        gauge_type: gauge_type,
        timestamp: timestamp,
        addr:addr,
        blockNumber: blockNumber,
        transactionHash: transactionHash,
        weight: weight
        
      }
    );
    console.log(response);
}

async function NewGaugeWeight(
    id,time, weight, gauge_address
   ) {
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
       gauge_address: gauge_address
     }
   );
   console.log(response);
}

async function NewTypeWeight(
    id,time, weight, type_id, total_weight
   ) {
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
       total_weight: total_weight
     }
   );
   console.log(response);
}

async function VoteForGauge(
    id,time, weight, gauge_addr, user
   ) {
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
       user: user
     }
   );
   console.log(response);
}

async function UpdateLiquidityLimit(
    user, id, original_balance, original_supply, working_balance, working_supply, transactionHash,block, timestamp
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

async function Deposit(
    provider,id, value, transactionHash, logIndex
   ) {
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
       logIndex: logIndex
     }
   );
   console.log(response);
}

async function Withdraw(
    provider,id, value, transactionHash, logIndex
   ) {
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
       logIndex: logIndex
     }
   );
   console.log(response);
}

async function NewProxyApp(
    appId,proxy, context, transactionHash, block, timestamp
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
       timestamp: timestamp
     }
   );
   console.log(response);
}

async function PoolAdded(
    poolId, transactionHash, block, timestamp
   ) {
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
       timestamp: timestamp
     }
   );
   console.log(response);
}

async function PoolRemoved(
    poolId, transactionHash, block, timestamp
   ) {
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
       timestamp: timestamp
     }
   );
   console.log(response);
}

async function MinimumBalanceSet(
    address, minBalance,
   ) {
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

async function MinimumTimeSet(
    address, minTime,
   ) {
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

async function ChangeMinQuorum(
    address, minAcceptQuorumPct,
   ) {
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

async function ChangeSupportRequired(
    address, supportRequiredPct,
   ) {
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
    address, creator, voteId, metadata, creatorVotingPower, timestamp, block, transactionHash,
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
    address, voteId, voter, stake,supports, timestamp, block, transactionHash, logIndex
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
        logIndex: logIndex
      }
    );
    console.log(response);
}

async function ExecuteVote(
    address, voteId, timestamp, block, transactionHash,
    ) {
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


async function startTests(){
    await AddLiquidity('1','1','1','1','1','1','1','1','1','1','1','1');
    // await RemoveLiquidity('1','1','1','1','1','1','1','1','1','1','1');
    // await RemoveLiquidityImbalance('1','1','1','1','1','1','1','1','1','1','1','1');
    // await RemoveLiquidityOne('1','1','1','1','1','1','1','1','1','1');
    
}

startTests();
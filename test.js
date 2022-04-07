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
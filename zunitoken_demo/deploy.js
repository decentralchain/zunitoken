const fetch = require("node-fetch");
const { broadcast, waitForTx, setScript, invokeScript } = require("@unitoken/unitoken-transactions");
const { address, base58Encode, publicKey } = require("@unitoken/unitoken-crypto");
const fs = require("fs");
const {extract_vk} = require("../zunitoken_node/lib/index.js");



const env = process.env;
if (env.NODE_ENV !== 'production') {
  require('dotenv').load();
}




const seed = env.MNEMONIC;
const rpc = env.unitoken_RPC;
const chainId = env.unitoken_CHAINID;
const dApp = address(env.MNEMONIC, chainId);

const ridetpl = fs.readFileSync("ride/zunitoken.ride", {encoding:"utf8"});
const transfer_mpc = fs.readFileSync("../zunitoken_setup/mpc_params_transfer");
const accumulator_mpc = fs.readFileSync("../zunitoken_setup/mpc_params_accumulator");




(async () => {
  const ridescript = ridetpl
    .replace(`let transferVK=base58''`, `let transferVK=base58'${base58Encode(extract_vk(transfer_mpc))}'`)
    .replace(`let utxoAccumulatorVK=base58''`, `let utxoAccumulatorVK=base58'${base58Encode(extract_vk(accumulator_mpc))}'`)
 
  
  let request = await fetch(`${env.unitoken_RPC}utils/script/compile`, { method: "POST", body: ridescript })
  const {script} = await request.json();
  

  let tx = setScript({ script, fee: 1400000, chainId}, seed);
  await broadcast(tx, rpc);
  await waitForTx(tx.id, { apiBase: rpc });

  console.log(`Dapp is deployed with public key ${publicKey(seed)}. Specify DAPP property at .env file.`)

  process.exit();
})();
const NODE_URL = `coris.network`;
const NETWORK = `cosmos`;

export const nodeRpc1 = `https://${NODE_URL}/${NETWORK}/rpc1`;
export const nodeRpc2 = `https://${NODE_URL}/${NETWORK}/rpc2`;
export const nodeWs = `wss://${NODE_URL}/${NETWORK}/websocket`;
export const appApi = `https://${NODE_URL}/${NETWORK}/api`;
// TODO remove faucet from cosmos version
export const faucetRpc = 'http://regen.coris.network/api';
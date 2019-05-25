import { Document } from 'mongoose';

export interface Validator extends Document {
readonly operator_address: String;
readonly consensus_pubkey: String;
readonly jailed: Boolean;
readonly status:	Number;
readonly tokens:	String;
readonly delegator_shares:	String;
readonly description: any;
readonly unbonding_height: String;
readonly unbonding_time: String;
readonly commission: any;
readonly min_self_delegation: String;
readonly unbonding_total: Number;
readonly signing_info: any;
readonly outstanding_rewards: any;
readonly rewards: any;
readonly unbonding_delegations: any;
readonly distribution: any;
readonly account: any;
readonly delegations: any;
readonly self_bond: Number;
}

import * as mongoose from 'mongoose';

export const ValidatorSchema = new mongoose.Schema({
  operator_address: String,
  consensus_pubkey: String,
  jailed: Boolean,
  status:	Number,
  tokens:	String,
  delegator_shares:	String,
  description: { type: mongoose.Schema.Types.Mixed },
  unbonding_height: String,
  unbonding_time: String,
  commission: { type: mongoose.Schema.Types.Mixed },
  min_self_delegation: String,
  unbonding_total: Number,
  signing_info: { type: mongoose.Schema.Types.Mixed },
  outstanding_rewards: { type: mongoose.Schema.Types.Mixed },
  rewards: { type: mongoose.Schema.Types.Mixed },
  unbonding_delegations: { type: mongoose.Schema.Types.Mixed },
  distribution: { type: mongoose.Schema.Types.Mixed },
  account: { type: mongoose.Schema.Types.Mixed },
  delegations: { type: mongoose.Schema.Types.Mixed },
  self_bond: Number
});

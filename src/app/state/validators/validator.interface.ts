export interface ValidatorsState {
  validators: Validator[] | null;
  validatorsMap: any;
};

export interface Validator {
  operator_address: string;
  consensus_pubkey: string;
  jailed: Boolean;
  status:	Number;
  tokens:	string;
  delegator_shares:	string;
  description: any;
  unbonding_height: string;
  unbonding_time: string;
  commission: any;
  min_self_delegation: string;
  unbonding_total: Number;
  signing_info: any;
  outstanding_rewards: any;
  rewards: any;
  unbonding_delegations: any;
  distribution: any;
  account: any;
  delegations: any;
  self_bond_total: Number;
};
  
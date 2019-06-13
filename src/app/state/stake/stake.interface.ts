export interface StakeState {
  totalStake: number | null;
  stakePool: Pool;
  atomPrice: number | string | null;
  inflation: number | string | null;
};

export interface Pool {
  denom: string | null;
  bonded: string | null;
  notBonded: string | null;
  communityPool: string | number | null;
}



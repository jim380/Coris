export interface Coins {
  denom: string;
  amount: string;
}

export interface FaucetState {
  address: string;
  coins: Coins[] | null;
};
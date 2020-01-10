export default interface DelegateInterface {
  rank?: number | string;
  username?: string;
  votes?: number;
  blocks?: {
    produced: string;
  };
}

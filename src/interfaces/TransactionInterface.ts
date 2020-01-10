export default interface TransactionInterface {
  id: string;
  amount: string;
  timestamp: any;
  blockId?: string;
  fee?: number;
  sender?: string;
  recipient?: string;
  signature?: string;
}

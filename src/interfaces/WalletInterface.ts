export interface WalletInterface {
  passphrase?: string;
  address?: string;
  publicKey?: string;
  wif?: string;
  entropy?: string;
  isDelegate?: Boolean;
  balance?: number;
}

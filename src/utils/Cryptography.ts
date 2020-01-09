import { WalletInterface } from "@/interfaces/WalletInterface";
import { entropyToMnemonic, mnemonicToEntropy } from "bip39";
import { Identities } from "@arkecosystem/crypto";

export default class Cryptography {
  public generateWalletKeys(data: any): WalletInterface {
    const mneumonic = entropyToMnemonic(data);
    const privateKey = Identities.PrivateKey.fromPassphrase(mneumonic);
    const publicKey = Identities.PublicKey.fromPassphrase(mneumonic);
    const address = Identities.Address.fromPublicKey(publicKey);
    const wif = Identities.WIF.fromPassphrase(mneumonic);
    const entropy = mnemonicToEntropy(mneumonic);

    const wallet: WalletInterface = {
      passphrase: mneumonic,
      address,
      publicKey,
      wif,
      entropy
    };

    return wallet;
  }
}

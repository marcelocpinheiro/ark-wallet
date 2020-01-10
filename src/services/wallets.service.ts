import { WalletInterface } from "@/interfaces/WalletInterface";

export default class WalletsService {
  private apiUrl = process.env.VUE_APP_EXPLORER_API_URL;
  private walletsArray!: Array<WalletInterface>;
  private favWallets!: Array<string>;

  constructor() {
    this.updateWalletsArray();
  }

  private updateWalletsArray() {
    const data = localStorage.getItem("wallets");
    const fav = localStorage.getItem("favWallets");
    if (null !== data) {
      this.walletsArray = JSON.parse(data);
    }

    if (null !== fav) {
      this.favWallets = JSON.parse(fav);
    }
  }

  public async getWallet(key: string) {
    const endpoint = `${this.apiUrl}/wallets/${key}`;
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getWalletTransactions(
    key: string,
    limit: Number = 5,
    page: Number = 1
  ) {
    const endpoint = `${this.apiUrl}/wallets/${key}/transactions?limit=${limit}&page=${page}`;
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getWalletVotes(
    key: string,
    limit: Number = 5,
    page: Number = 1
  ) {
    const endpoint = `${this.apiUrl}/wallets/${key}/votes?limit=${limit}&page=${page}`;
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public getAllLocalWallets(): Array<any> {
    return this.walletsArray;
  }

  public isWalletFav(walletAddress: string | undefined): Boolean {
    if (!walletAddress || this.favWallet.length == 0) return false;
    return (
      this.favWallets.filter(address => {
        return address === walletAddress;
      }).length > 0
    );
  }

  public favWallet(walletAddress: string | undefined) {
    if (walletAddress && !this.isWalletFav(walletAddress)) {
      this.favWallets.push(walletAddress);
      localStorage.setItem("favWallets", JSON.stringify(this.favWallets));
      this.updateWalletsArray();
    }
  }

  public unfavWallet(walletAddress: string | undefined) {
    if (walletAddress && this.isWalletFav(walletAddress)) {
      this.favWallets = this.favWallets.filter(
        address => walletAddress !== address
      );
      localStorage.setItem("favWallets", JSON.stringify(this.favWallets));
      this.updateWalletsArray();
    }
  }

  public getFavWalletsAddresses(): Array<string> {
    return this.favWallets;
  }

  public getLocalWallet(key: string) {
    const data = this.walletsArray.filter(
      obj => obj.address === key || obj.publicKey === key
    );
    return data;
  }

  public setLocalWallets(array: Array<WalletInterface>) {
    localStorage.setItem("wallets", JSON.stringify(array));
    this.updateWalletsArray();
  }
}

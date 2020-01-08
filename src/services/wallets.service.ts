export default class WalletsService {
  private apiUrl = process.env.VUE_APP_EXPLORER_API_URL;
  private walletsArray = [];

  constructor() {
    this.updateWalletsArray();
  }

  private updateWalletsArray() {
    const data = localStorage.getItem("wallets");
    if (null !== data) {
      this.walletsArray = JSON.parse(data);
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

  public getAllLocalWallets(): Array<any> {
    return this.walletsArray;
  }

  public getLocalWallet(key) {
    const data = this.walletsArray.filter(
      obj => obj.address === key || obj.publicKey === key
    );
    return data;
  }

  public setLocalWallets(array) {
    localStorage.setItem("wallets", JSON.stringify(array));
    this.updateWalletsArray();
  }
}

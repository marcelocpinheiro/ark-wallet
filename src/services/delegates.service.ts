export default class DelegatesService {
  private apiUrl = process.env.VUE_APP_EXPLORER_API_URL;

  public async getAllDelegates(limit: Number = 51, page: Number = 1) {
    const endpoint = `${this.apiUrl}/delegates?limit=${limit}&page=${page}`;
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

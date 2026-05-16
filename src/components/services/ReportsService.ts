import axios from "axios";

export default class ReportsService {
  public async getPrices(
    symbols: string[],
  ): Promise<Record<string, { USD: number }>> {
    const symbolsText = symbols.join(",");

    const url = `https://min-api.cryptocompare.com/data/pricemulti?tsyms=USD&fsyms=${symbolsText}`;

    const response = await axios.get(url);

    return response.data;
  }
}

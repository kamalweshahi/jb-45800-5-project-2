import axios from "axios";
import type Coin from "../models/Coin";
import type CoinMoreInfo from "../models/CoinMoreInfo";

export default class CoinsService {
  public async getCoins(): Promise<Coin[]> {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

    const response = await axios.get<Coin[]>(url);

    return response.data.slice(0, 100);
  }
  public async getMoreInfo(id: string): Promise<CoinMoreInfo> {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;

    const response = await axios.get<CoinMoreInfo>(url);

    return response.data;
  }
}

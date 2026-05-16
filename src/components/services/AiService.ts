import axios from "axios";
import type CoinMoreInfo from "../models/CoinMoreInfo";

export default class AiService {
  public async getRecommendation(
    apiKey: string,
    coinName: string,
    coinInfo: CoinMoreInfo,
  ): Promise<string> {
    const url = "/nvidia/v1/chat/completions";

    const prompt = `
You are a crypto investment assistant.

Give a recommendation about this coin:

Name: ${coinName}
Current USD Price: ${coinInfo.market_data.current_price.usd}
Market Cap USD: ${coinInfo.market_data.market_cap?.usd}
24h Volume USD: ${coinInfo.market_data.total_volume?.usd}
30d Change: ${coinInfo.market_data.price_change_percentage_30d}
60d Change: ${coinInfo.market_data.price_change_percentage_60d}
200d Change: ${coinInfo.market_data.price_change_percentage_200d}

Answer with:
1. Buy / Do not buy
2. Short explanation
`;

    const response = await axios.post(
      url,
      {
        model: "meta/llama-3.1-8b-instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 500,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  }
}

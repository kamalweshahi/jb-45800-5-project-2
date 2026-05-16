export default interface CoinMoreInfo {
  image: {
    small: string;
  };

  market_data: {
    current_price: {
      usd: number;
      eur: number;
      ils: number;
    };

    market_cap?: {
      usd: number;
    };

    total_volume?: {
      usd: number;
    };

    price_change_percentage_30d?: number;
    price_change_percentage_60d?: number;
    price_change_percentage_200d?: number;
  };
}

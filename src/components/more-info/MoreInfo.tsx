import { useEffect, useState } from "react";
import "./MoreInfo.css";
import type CoinMoreInfo from "../models/CoinMoreInfo";
import CoinsService from "../services/CoinsService";

interface MoreInfoProps {
  coinId: string;
}

export default function MoreInfo(props: MoreInfoProps) {
  const [info, setInfo] = useState<CoinMoreInfo | null>(null);

  const coinsService = new CoinsService();

  useEffect(() => {
    (async () => {
      try {
        const data = await coinsService.getMoreInfo(props.coinId);

        setInfo(data);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  if (!info) return <p>Loading...</p>;

  return (
    <div className="MoreInfo">
      <img src={info.image.small} />

      <p>USD: ${info.market_data.current_price.usd}</p>

      <p>EUR: €{info.market_data.current_price.eur}</p>

      <p>ILS: ₪{info.market_data.current_price.ils}</p>
    </div>
  );
}

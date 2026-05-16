import { useEffect, useState } from "react";
import "./Home.css";
import type Coin from "../../models/Coin";
import CoinsService from "../../services/CoinsService";
import CoinCard from "../../coin-card/CoinCard";

interface HomeProps {
  search: string;
}

export default function Home(props: HomeProps) {
  const [coins, setCoins] = useState<Coin[]>([]);

  const coinsService = new CoinsService();

  useEffect(() => {
    (async () => {
      try {
        const data = await coinsService.getCoins();
        setCoins(data);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(props.search.toLowerCase()) ||
      coin.name.toLowerCase().includes(props.search.toLowerCase()),
  );

  return (
    <div className="Home">
      <h2>Top 100 Cryptocurrencies</h2>

      <div className="Home-coins">
        {filteredCoins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}

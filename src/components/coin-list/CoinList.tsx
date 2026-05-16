import React from "react";
import "./CoinList.css";
import CoinCard from "../coin-card/CoinCard";
import { Coin } from "../../models/Coin";

type Props = { coins: Coin[] };

const CoinList: React.FC<Props> = ({ coins }) => {
  return (
    <div className="coin-list">
      {coins.map((c) => (
        <CoinCard key={c.id} coin={c} />
      ))}
    </div>
  );
};

export default CoinList;

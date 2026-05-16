import { useState } from "react";
import "./CoinCard.css";
import type Coin from "../models/Coin";
import SwitchButton from "../switch-button/SwitchButton";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { addSelectedCoin, removeSelectedCoin } from "../redux/coins-slice";
import MoreInfo from "../more-info/MoreInfo";
import MaxCoinsDialog from "../max-coins-dialog/MaxCoinsDialog";

interface CoinCardProps {
  coin: Coin;
}

export default function CoinCard(props: CoinCardProps) {
  const { coin } = props;

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();

  const selectedCoins = useSelector(
    (state: RootState) => state.coins.selectedCoins,
  );

  const isSelected = selectedCoins.some(
    (selectedCoin) => selectedCoin.id === coin.id,
  );

  function toggleCoin() {
    if (isSelected) {
      dispatch(removeSelectedCoin(coin.id));
      return;
    }

    if (selectedCoins.length >= 5) {
      setShowDialog(true);
      return;
    }

    dispatch(addSelectedCoin(coin));
  }

  return (
    <div className="CoinCard">
      <div className="CoinCard-top">
        <img src={coin.image} alt={coin.name} />

        <SwitchButton checked={isSelected} onChange={toggleCoin} />
      </div>

      <h3>{coin.symbol.toUpperCase()}</h3>

      <p>{coin.name}</p>

      <button onClick={() => setShowMoreInfo(!showMoreInfo)}>More Info</button>

      {showMoreInfo && <MoreInfo coinId={coin.id} />}

      {showDialog && (
        <MaxCoinsDialog newCoin={coin} onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
}

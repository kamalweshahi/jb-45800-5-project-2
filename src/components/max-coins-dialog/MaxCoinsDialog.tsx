import "./MaxCoinsDialog.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { removeSelectedCoin, addSelectedCoin } from "../redux/coins-slice";
import type Coin from "../models/Coin";

interface MaxCoinsDialogProps {
  newCoin: Coin;
  onClose: () => void;
}

export default function MaxCoinsDialog(props: MaxCoinsDialogProps) {
  const dispatch = useDispatch();

  const selectedCoins = useSelector(
    (state: RootState) => state.coins.selectedCoins,
  );

  function replaceCoin(removeCoinId: string) {
    dispatch(removeSelectedCoin(removeCoinId));
    dispatch(addSelectedCoin(props.newCoin));
    props.onClose();
  }

  return (
    <div className="MaxCoinsDialog-overlay">
      <div className="MaxCoinsDialog">
        <h2>You can select up to 5 coins only</h2>

        <p>Select a coin to remove:</p>

        <div className="MaxCoinsDialog-coins">
          {selectedCoins.map((coin) => (
            <div key={coin.id} className="MaxCoinsDialog-coin">
              <span>{coin.symbol.toUpperCase()}</span>

              <button onClick={() => replaceCoin(coin.id)}>Remove</button>
            </div>
          ))}
        </div>

        <button className="MaxCoinsDialog-close" onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

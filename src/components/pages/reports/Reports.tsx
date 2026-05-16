import "./Reports.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import RealTimeChart from "../../real-time-chart/RealTimeChart";

export default function Reports() {
  const selectedCoins = useSelector(
    (state: RootState) => state.coins.selectedCoins,
  );

  return (
    <div className="Reports">
      <h2>Real Time Reports</h2>

      <p className="Reports-subtitle">
        Live price chart in USD updated every second
      </p>

      {selectedCoins.length === 0 && (
        <p className="Reports-empty">Please select coins from the Home page.</p>
      )}

      {selectedCoins.length > 0 && (
        <>
          <div className="Reports-selected">
            <div className="Reports-selected-header">
              <h3>Selected Coins ({selectedCoins.length}/5)</h3>
              <span>You can select up to 5 coins</span>
            </div>

            <div className="Reports-selected-list">
              {selectedCoins.map((coin) => (
                <div key={coin.id} className="Reports-selected-card">
                  <img src={coin.image} alt={coin.name} />

                  <div>
                    <strong>{coin.symbol.toUpperCase()}</strong>
                    <span>{coin.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RealTimeChart coins={selectedCoins} />
        </>
      )}
    </div>
  );
}

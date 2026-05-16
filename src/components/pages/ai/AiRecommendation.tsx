import { useState } from "react";
import "./AiRecommendation.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import CoinsService from "../../services/CoinsService";
import AiService from "../../services/AiService";

export default function AiRecommendation() {
  const selectedCoins = useSelector(
    (state: RootState) => state.coins.selectedCoins,
  );

  const [apiKey, setApiKey] = useState(
    localStorage.getItem("nvidia-api-key") || "",
  );

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ coin: string; text: string }[]>([]);

  const coinsService = new CoinsService();
  const aiService = new AiService();

  async function getRecommendations() {
    try {
      if (!apiKey) {
        alert("Please enter API key");
        return;
      }

      if (selectedCoins.length === 0) {
        alert("Please select coins first");
        return;
      }

      setLoading(true);
      setResults([]);
      localStorage.setItem("nvidia-api-key", apiKey);

      const responses = await Promise.all(
        selectedCoins.map(async (coin) => {
          const info = await coinsService.getMoreInfo(coin.id);

          const recommendation = await aiService.getRecommendation(
            apiKey,
            coin.name,
            info,
          );

          return {
            coin: `${coin.name} (${coin.symbol.toUpperCase()})`,
            text: recommendation,
          };
        }),
      );

      setResults(responses);
    } catch (e) {
      console.log("AI ERROR:", e);
      alert("AI request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="AiRecommendation">
      <h2>AI Crypto Recommendation</h2>

      <p className="AiRecommendation-subtitle">
        Get AI recommendations for your selected cryptocurrencies using NVIDIA
        AI.
      </p>

      {selectedCoins.length === 0 && (
        <p className="AiRecommendation-empty">
          Please select coins from the Home page first.
        </p>
      )}

      {selectedCoins.length > 0 && (
        <div className="AiRecommendation-selected">
          <div className="AiRecommendation-selected-header">
            <h3>Selected Coins ({selectedCoins.length}/5)</h3>
            <span>AI will analyze these coins</span>
          </div>

          <div className="AiRecommendation-selected-list">
            {selectedCoins.map((coin) => (
              <div key={coin.id} className="AiRecommendation-selected-card">
                <img src={coin.image} alt={coin.name} />

                <div>
                  <strong>{coin.symbol.toUpperCase()}</strong>
                  <span>{coin.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="AiRecommendation-box">
        <input
          type="password"
          placeholder="Enter NVIDIA API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <button onClick={getRecommendations} disabled={loading}>
          {loading ? "Loading..." : "Get AI Recommendations"}
        </button>
      </div>

      {loading && (
        <div className="AiRecommendation-loader">Analyzing coins...</div>
      )}

      {results.length > 0 && (
        <div className="AiRecommendation-results">
          {results.map((result) => (
            <div key={result.coin} className="AiRecommendation-card">
              <h3>{result.coin}</h3>
              <p>{result.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

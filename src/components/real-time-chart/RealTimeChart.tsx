import { useEffect, useState } from "react";
import "./RealTimeChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ReportsService from "../services/ReportsService";
import type Coin from "../models/Coin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

interface RealTimeChartProps {
  coins: Coin[];
}

const colors = ["#f97316", "#3b82f6", "#10b981", "#a855f7", "#eab308"];

export default function RealTimeChart(props: RealTimeChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [pricesBySymbol, setPricesBySymbol] = useState<
    Record<string, number[]>
  >({});
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const reportsService = new ReportsService();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const symbols = props.coins.map((coin) => coin.symbol.toUpperCase());
        const prices = await reportsService.getPrices(symbols);
        const time = new Date().toLocaleTimeString();

        setLabels((prev) => [...prev.slice(-25), time]);
        setLastUpdated(time);

        setPricesBySymbol((prev) => {
          const updated = { ...prev };

          props.coins.forEach((coin) => {
            const symbol = coin.symbol.toUpperCase();

            if (!updated[symbol]) updated[symbol] = [];

            updated[symbol] = [
              ...updated[symbol].slice(-25),
              prices[symbol]?.USD || 0,
            ];
          });

          return updated;
        });
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.coins]);

  const data = {
    labels,
    datasets: props.coins.map((coin, index) => {
      const symbol = coin.symbol.toUpperCase();

      return {
        label: symbol,
        data: pricesBySymbol[symbol] || [],
        borderColor: colors[index],
        backgroundColor: colors[index],
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb",
          font: {
            size: 14,
            weight: "bold" as const,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#cbd5e1",
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
      },
      y: {
        ticks: {
          color: "#cbd5e1",
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
      },
    },
  };

  return (
    <div className="RealTimeChart">
      <div className="RealTimeChart-header">
        <div>
          <h3>
            Live Prices <span>(USD)</span>
          </h3>

          <p>Updated every second</p>
        </div>

        <div className="RealTimeChart-live">● Live</div>
      </div>

      <Line data={data} options={options} />

      <div className="RealTimeChart-info">
        <div>
          <strong>Last Updated</strong>
          <span>{lastUpdated || "Waiting..."}</span>
        </div>

        <div>
          <strong>Update Frequency</strong>
          <span>Every 1 second</span>
        </div>

        <div>
          <strong>Data Source</strong>
          <span>CryptoCompare</span>
        </div>

        <div>
          <strong>Currency</strong>
          <span>USD</span>
        </div>
      </div>
    </div>
  );
}

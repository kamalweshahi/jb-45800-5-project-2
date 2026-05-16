import "./About.css";

export default function About() {
  return (
    <div className="About">
      <h2>About Cryptonite</h2>

      <div className="About-card">
        <h3>Project Description</h3>

        <p>
          Cryptonite is a React and TypeScript project that displays real-time
          information about virtual currencies.
        </p>

        <p>
          The project allows users to view cryptocurrency cards, search coins,
          open more information about each coin, select up to five coins for
          live reports, and receive AI recommendations about selected coins.
        </p>

        <p>
          The project uses external APIs for cryptocurrency data, live prices,
          and AI-based recommendations.
        </p>

        <div className="About-developer">
          <strong>Developer:</strong>
          <span>Kamal Weshahi</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./Layout.css";
import Menu from "../menu/Menu";
import Router from "../routing/Router";

export default function Layout() {
  const [search, setSearch] = useState("");

  return (
    <div className="Layout">
      <header className="Layout-header">
        <h1>
          Crypto<span>nite</span>
        </h1>
      </header>

      <Menu search={search} setSearch={setSearch} />

      <main className="Layout-main">
        <Router search={search} />
      </main>
    </div>
  );
}

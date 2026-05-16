import { NavLink } from "react-router-dom";
import "./Menu.css";

interface MenuProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Menu(props: MenuProps) {
  return (
    <nav className="Menu">
      <div className="Menu-links">
        <NavLink to="/home">Home</NavLink>

        <NavLink to="/reports">Real Time Reports</NavLink>

        <NavLink to="/ai">AI Recommendation</NavLink>

        <NavLink to="/about">About</NavLink>
      </div>

      <input
        type="text"
        placeholder="Search coin..."
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />
    </nav>
  );
}

import { BrowserRouter } from "react-router-dom";
import { Provider as Redux } from "react-redux";
import "./App.css";
import Layout from "../layout/Layout";
import store from "../redux/store";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Redux store={store}>
          <Layout />
        </Redux>
      </BrowserRouter>
    </div>
  );
}

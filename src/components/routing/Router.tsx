import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Reports from "../pages/reports/Reports";
import AiRecommendation from "../pages/ai/AiRecommendation";
import About from "../pages/about/About";

interface RouterProps {
  search: string;
}

export default function Router(props: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home search={props.search} />} />

      <Route path="/reports" element={<Reports />} />

      <Route path="/ai" element={<AiRecommendation />} />

      <Route path="/about" element={<About />} />
    </Routes>
  );
}

import { initAnalytics } from "./lib/analytics.ts";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

initAnalytics();

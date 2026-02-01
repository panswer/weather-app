import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import FilterWeatherProvider from "./contexts/filter-weather-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterWeatherProvider>
      <App />
    </FilterWeatherProvider>
  </StrictMode>
);

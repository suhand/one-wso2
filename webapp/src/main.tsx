import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWithConfig from "./AppWithConfig";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithConfig />
  </StrictMode>,
);

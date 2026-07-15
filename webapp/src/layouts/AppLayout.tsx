import { useState } from "react";
import { Outlet } from "react-router";
import { Box } from "@wso2/oxygen-ui";
import TopBar from "@components/top-bar/TopBar";
import SideRail from "@components/side-rail/SideRail";
import WaffleOverlay from "@components/waffle/WaffleOverlay";
import AskNoveraPalette from "@components/ask-novera/AskNoveraPalette";
import AuthDebugPanel from "@features/debug/AuthDebugPanel";

// The persistent shell — the top bar and rail stay put; the canvas swaps
// with the active perspective (Outlet). Waffle and Ask Novera are overlays
// that mount into the same layout root.
export default function AppLayout() {
  const [waffleOpen, setWaffleOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "56px 1fr", height: "100vh" }}>
      <TopBar
        onOpenWaffle={() => setWaffleOpen(true)}
        onOpenAsk={() => setAskOpen(true)}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          minHeight: 0,
        }}
      >
        <SideRail />
        <Box
          component="main"
          sx={{
            overflowY: "auto",
            px: 3,
            py: 3,
            backgroundColor: "background.default",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      {waffleOpen && <WaffleOverlay onClose={() => setWaffleOpen(false)} />}
      {askOpen && <AskNoveraPalette onClose={() => setAskOpen(false)} />}
      <AuthDebugPanel />
    </Box>
  );
}

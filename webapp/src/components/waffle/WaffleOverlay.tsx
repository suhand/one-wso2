import { Box, Typography } from "@wso2/oxygen-ui";
import { useNavigate } from "react-router";
import {
  FUNCTIONAL_PERSPECTIVES,
  CROSS_PERSPECTIVES,
  type PerspectiveDef,
} from "@constants/perspectives";
import { useActivePerspective } from "@context/perspective/PerspectiveContext";

interface WaffleOverlayProps {
  onClose: () => void;
}

// The 9-dots perspective switcher. Grid of tiles: functional (persona) on
// top, cross (My / Requests) below. Locked tiles show 🔒 and don't
// navigate.
export default function WaffleOverlay({ onClose }: WaffleOverlayProps) {
  const navigate = useNavigate();
  const active = useActivePerspective();

  const pick = (p: PerspectiveDef) => {
    if (!p.access || !p.path) return;
    navigate(p.path);
    onClose();
  };

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(10,10,11,.4)",
        backdropFilter: "blur(3px)",
        zIndex: 1300,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "absolute",
          top: 54,
          right: 120,
          width: 340,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          boxShadow: 8,
          p: 1.75,
        }}
      >
        <WaffleGroup
          title="Functional"
          items={FUNCTIONAL_PERSPECTIVES}
          activeKey={active.key}
          onPick={pick}
        />
        <WaffleGroup
          title="For you"
          items={CROSS_PERSPECTIVES}
          activeKey={active.key}
          onPick={pick}
        />
        <Box
          sx={{
            mt: 1.5,
            borderTop: 1,
            borderColor: "divider",
            pt: 1.25,
            fontSize: 12,
            color: "text.secondary",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Home perspective</span>
          <b style={{ color: "var(--mui-palette-primary-main)" }}>People Ops</b>
        </Box>
      </Box>
    </Box>
  );
}

interface WaffleGroupProps {
  title: string;
  items: readonly PerspectiveDef[];
  activeKey: string;
  onPick: (p: PerspectiveDef) => void;
}

function WaffleGroup({ title, items, activeKey, onPick }: WaffleGroupProps) {
  return (
    <>
      <Typography
        sx={{
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "text.disabled",
          fontWeight: 600,
          m: "10px 4px 8px",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
        {items.map((p) => (
          <Box
            key={p.key}
            role="button"
            onClick={() => onPick(p)}
            sx={{
              aspectRatio: "1",
              border: 1,
              borderColor: p.key === activeKey ? "primary.main" : "divider",
              borderRadius: 1.375,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              fontSize: 11,
              fontWeight: 600,
              color: p.access ? "text.primary" : "text.disabled",
              opacity: p.access ? 1 : 0.4,
              cursor: p.access ? "pointer" : "not-allowed",
              bgcolor: p.key === activeKey ? "primary.light" : "transparent",
              transition: "border-color .15s, background-color .15s",
              "&:hover": p.access
                ? { borderColor: "primary.main", color: "primary.main", bgcolor: "primary.light" }
                : undefined,
              px: 0.75,
              py: 0.75,
              textAlign: "center",
            }}
          >
            <Box sx={{ fontSize: 18 }}>{p.emoji}</Box>
            {p.label}
            {!p.access && <Box sx={{ fontSize: 10 }}>🔒</Box>}
          </Box>
        ))}
      </Box>
    </>
  );
}

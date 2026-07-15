import { Box, Typography } from "@wso2/oxygen-ui";
import type { FunnelStage } from "../types";

// Compact requisition funnel: Shortlisted → Screen → Interview → Offer.
// `.hot` (orange) marks the stage that most demands action; `.dim` marks
// empty stages. Non-actionable stages use neutral chrome.
export default function Funnel({ stages }: { stages: FunnelStage[] }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.625, flexWrap: "wrap" }}>
      {stages.map((s, i) => (
        <Box key={s.label} sx={{ display: "flex", alignItems: "center", gap: 0.625 }}>
          <StageTile stage={s} />
          {i < stages.length - 1 && (
            <Box component="span" sx={{ color: "divider", fontSize: 11 }}>→</Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

function StageTile({ stage }: { stage: FunnelStage }) {
  return (
    <Box
      sx={{
        bgcolor: stage.hot ? "primary.light" : "action.hover",
        border: 1,
        borderColor: stage.hot ? "primary.main" : "divider",
        borderRadius: 1,
        px: 1,
        py: 0.625,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 54,
        fontSize: 10,
        color: stage.hot ? "primary.main" : "text.secondary",
        gap: "1px",
        lineHeight: 1.15,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        opacity: stage.dim ? 0.55 : 1,
      }}
    >
      <Typography
        component="b"
        sx={{
          color: stage.hot ? "primary.main" : "text.primary",
          fontSize: 15,
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stage.count}
      </Typography>
      {stage.label}
    </Box>
  );
}

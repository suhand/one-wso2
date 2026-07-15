import { Box, Card, Chip, LinearProgress, Stack, Typography } from "@wso2/oxygen-ui";
import { PROMOTION_NOMINEES } from "../constants/data";

const CHIP_COLOR = { ok: "success", watch: "warning", crit: "error" } as const;

// Two-column Performance & Promotions block: cycle progress + nominee list.
export default function PerformancePromotions() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.75 }}>
      {/* H1 review cycle card */}
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
          H1 2026 review cycle
        </Typography>
        <Stack direction="row" alignItems="flex-end" spacing={2} sx={{ mb: 1.5 }}>
          <Typography sx={{ fontSize: 27, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
            68%
          </Typography>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 0.625 }}>
              Cycle closes Jul 26 · 21 days remaining
            </Typography>
            <LinearProgress variant="determinate" value={68} sx={{ height: 7, borderRadius: 3 }} />
          </Box>
        </Stack>
        <StatRow label="Self-assessments completed" value="312 / 340" />
        <StatRow label="Manager sign-off pending" value="24" />
        <StatRow label="Reviews overdue" chip={{ label: "12", color: "error" }} />
        <StatRow label="Calibration meetings scheduled" value="3 / 5" last />
      </Card>

      {/* Promotion cycle */}
      <Card variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600 }}>
            Promotion cycle
          </Typography>
          <Chip label={PROMOTION_NOMINEES.length} color="primary" size="small" sx={{ height: 20, fontSize: 10, fontWeight: 700 }} />
        </Stack>
        <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
          Nominations open · panel Aug 12–15
        </Typography>
        {PROMOTION_NOMINEES.map((n, idx) => (
          <Stack
            key={n.name}
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{ py: 1.125, borderBottom: idx < PROMOTION_NOMINEES.length - 1 ? 1 : 0, borderColor: "divider" }}
          >
            <Box sx={{ width: 26, height: 26, borderRadius: 0.875, bgcolor: "action.hover", display: "grid", placeItems: "center", fontSize: 13 }}>⬆</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>{n.name}</Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{n.track}</Typography>
            </Box>
            <Chip label={n.pill.label} color={CHIP_COLOR[n.pill.tone]} size="small" sx={{ height: 20, fontSize: 11, fontWeight: 600 }} />
          </Stack>
        ))}
      </Card>
    </Box>
  );
}

function StatRow({
  label,
  value,
  chip,
  last,
}: {
  label: string;
  value?: string;
  chip?: { label: string; color: "error" | "warning" | "success" | "default" };
  last?: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 1.125, borderBottom: last ? 0 : 1, borderColor: "divider", fontSize: 13 }}
    >
      <span>{label}</span>
      {chip ? (
        <Chip label={chip.label} color={chip.color} size="small" sx={{ height: 20, fontSize: 11, fontWeight: 600 }} />
      ) : (
        <b style={{ fontVariantNumeric: "tabular-nums" }}>{value}</b>
      )}
    </Stack>
  );
}

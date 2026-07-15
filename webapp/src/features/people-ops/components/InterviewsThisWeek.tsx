import { Box, Button, Card, Chip, Stack, Typography } from "@wso2/oxygen-ui";
import { INTERVIEWS_THIS_WEEK } from "../constants/data";

const CHIP_COLOR = { crit: "error", watch: "warning", ok: "success" } as const;

export default function InterviewsThisWeek() {
  return (
    <Card variant="outlined" sx={{ p: 2, minHeight: 460 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography
          sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600 }}
        >
          Interviews this week
        </Typography>
        <Chip label={INTERVIEWS_THIS_WEEK.length} color="primary" size="small" sx={{ height: 20, fontSize: 10, fontWeight: 700 }} />
      </Stack>

      {INTERVIEWS_THIS_WEEK.map((iv, idx) => (
        <Stack
          key={iv.id}
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{
            py: 1.125,
            borderBottom: idx < INTERVIEWS_THIS_WEEK.length - 1 ? 1 : 0,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: 0.875,
              bgcolor: "action.hover",
              display: "grid",
              placeItems: "center",
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            🗓
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 13 }}>{iv.candidateName}</Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              {iv.when} · {iv.role}
              {iv.panel && ` · ${iv.panel}`}
              {iv.note && ` · ${iv.note}`}
            </Typography>
          </Box>
          {iv.pill && (
            <Chip
              label={iv.pill.label}
              color={CHIP_COLOR[iv.pill.tone]}
              size="small"
              sx={{ height: 18, fontSize: 10.5, fontWeight: 600 }}
            />
          )}
          {iv.actionLabel && (
            <Button variant="outlined" size="small">
              {iv.actionLabel}
            </Button>
          )}
        </Stack>
      ))}
    </Card>
  );
}

import { Box, Button, Card, Chip, Stack, Typography } from "@wso2/oxygen-ui";

// Three cards surfacing adjacent people-ops-suite services inside the
// profile: Vehicles, Time off, Performance & growth.
//
// The values shown are illustrative sample data, NOT the signed-in user's
// records — the vehicles, leave balance, and review status here are
// placeholders until the per-service backends (people-app vehicles,
// leave-app, performance) are wired up. The "Sample data" chip on the
// section intro makes this explicit to the user.
export default function ConnectedServices() {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.5, flex: 1 }}>
          Adjacent services surfaced inside your profile — <b>people-app</b>{" "}
          (vehicles), <b>leave-app</b>, and your performance cycle. No separate
          portals.
        </Typography>
        <Chip
          label="Sample data"
          size="small"
          color="warning"
          variant="outlined"
          sx={{ height: 22, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em" }}
        />
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 1.75 }}>
        {/* Vehicles */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Vehicles
          </Typography>
          <ConnectedRow icon="🚗" title="CAB-4287" meta="Toyota Aqua" actionLabel="Manage" />
          <ConnectedRow icon="🏍" title="BAJ-1122" meta="Bajaj Pulsar" actionLabel="Manage" last />
        </Card>

        {/* Time off */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Time off
          </Typography>
          <ConnectedRow icon="🌴" title="Leave balance" meta="12 days annual · 4 casual · 7 sick" actionLabel="Request" actionPrimary />
          <ConnectedRow icon="📅" title="Upcoming" meta="Aug 12–14 · approved" last />
        </Card>

        {/* Performance */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Performance &amp; growth
          </Typography>
          <Stack direction="row" spacing={1.25} sx={{ py: 1.125, borderBottom: 1, borderColor: "divider" }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                2026 H1 Review{" "}
                <Chip label="Submitted" color="success" size="small" sx={{ ml: 0.75, height: 20, fontSize: 11, fontWeight: 600 }} />
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Lead's PAR submission deadline approaching in 6 days
              </Typography>
            </Box>
            <Button variant="outlined" size="small">View</Button>
          </Stack>
          <Stack direction="row" spacing={1.25} sx={{ py: 1.125, alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>Last promoted date</Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Senior Forward Deployed Engineer II
              </Typography>
            </Box>
            <b style={{ fontVariantNumeric: "tabular-nums" }}>2024-07-01</b>
          </Stack>
        </Card>
      </Box>
    </>
  );
}

function ConnectedRow({
  icon,
  title,
  meta,
  actionLabel,
  actionPrimary,
  last,
}: {
  icon: string;
  title: string;
  meta: string;
  actionLabel?: string;
  actionPrimary?: boolean;
  last?: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.25}
      sx={{ py: 1.125, borderBottom: last ? 0 : 1, borderColor: "divider" }}
    >
      <Box sx={{ width: 26, height: 26, borderRadius: 0.875, bgcolor: "action.hover", display: "grid", placeItems: "center", fontSize: 13, flexShrink: 0 }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>{title}</Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{meta}</Typography>
      </Box>
      {actionLabel && (
        <Button variant={actionPrimary ? "contained" : "outlined"} size="small">
          {actionLabel}
        </Button>
      )}
    </Stack>
  );
}

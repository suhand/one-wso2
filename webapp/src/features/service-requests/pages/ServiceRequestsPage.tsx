import { Box, Button, Card, Chip, Stack, TextField, Typography } from "@wso2/oxygen-ui";

const CHIPS = [
  "Submit expense",
  "Request infrastructure",
  "New email / group",
  "Publish a job",
  "IT ticket",
];

// Cross-cutting service request catalog — matches the prototype's simpler
// static form. Requests get fulfilled by the destination team's functional
// perspective (Infra Ops, Finance, etc.).
export default function ServiceRequestsPage() {
  return (
    <Box>
      <Chip
        label="✦ Service Requests"
        color="primary"
        size="small"
        sx={{ mb: 0.5, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}
      />
      <Typography sx={{ fontSize: 23, fontWeight: 700, letterSpacing: "-0.02em", mb: 0.25 }}>
        What do you need?
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 2.25 }}>
        One place to ask — fulfilled by the right team behind the scenes
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
        {CHIPS.map((c) => (
          <Button key={c} variant="outlined" size="small" sx={{ fontSize: 12, borderRadius: 1.125 }}>
            {c}
          </Button>
        ))}
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.75 }}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Submit expense
          </Typography>
          <Chip
            label="✦ auto-generated from the expense service definition"
            color="primary"
            size="small"
            sx={{ mb: 2, fontSize: 11 }}
          />
          <Stack spacing={1.5}>
            <FormField label="Amount" defaultValue="$420.00" />
            <FormField label="Category" defaultValue="Travel" />
            <FormField label="Note" defaultValue="Client visit — Acme (Ask Novera pre-filled from calendar)" />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button variant="contained" size="small">Submit</Button>
              <Button variant="outlined" size="small">Save draft</Button>
            </Stack>
          </Stack>
        </Card>

        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            My recent requests
          </Typography>
          <RecentRow icon="🖥" title="Infra: staging node" meta="approved · Infra Ops" pill={{ label: "Done", tone: "ok" }} />
          <RecentRow icon="✉️" title="New group: one-design@" meta="pending" pill={{ label: "In review", tone: "watch" }} />
          <RecentRow icon="💳" title="Expense $96" meta="reimbursed" pill={{ label: "Done", tone: "ok" }} last />
        </Card>
      </Box>

      <Typography sx={{ fontSize: 12, color: "text.disabled", mt: 3, textAlign: "center", lineHeight: 1.6 }}>
        Requests appear in the fulfilling team's functional perspective (e.g.
        Infra Ops) — requester on one side, facilitator on the other.
      </Typography>
    </Box>
  );
}

function FormField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: "text.secondary",
          mb: 0.625,
        }}
      >
        {label}
      </Typography>
      <TextField size="small" fullWidth defaultValue={defaultValue} />
    </Box>
  );
}

function RecentRow({
  icon,
  title,
  meta,
  pill,
  last,
}: {
  icon: string;
  title: string;
  meta: string;
  pill: { label: string; tone: "ok" | "watch" };
  last?: boolean;
}) {
  const chipColor = pill.tone === "ok" ? "success" : "warning";
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.25}
      sx={{ py: 1.125, borderBottom: last ? 0 : 1, borderColor: "divider" }}
    >
      <Box sx={{ width: 26, height: 26, borderRadius: 0.875, bgcolor: "action.hover", display: "grid", placeItems: "center", fontSize: 13 }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>{title}</Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{meta}</Typography>
      </Box>
      <Chip label={pill.label} color={chipColor} size="small" sx={{ height: 20, fontSize: 11, fontWeight: 600 }} />
    </Stack>
  );
}

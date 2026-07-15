import { Box, Card, Stack, TextField, Typography } from "@wso2/oxygen-ui";

export default function EmployeeDirectory() {
  return (
    <Card variant="outlined" sx={{ p: 2, minHeight: 480 }}>
      <Typography
        sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}
      >
        Employee directory
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Search 940 employees — name, team, location…"
        sx={{ mb: 1 }}
      />
      <DirRow icon="✦" title="Ask Novera suggested" meta="&quot;Who owns Ballerina consulting delivery in EMEA?&quot;" />
      <DirRow icon="📊" title="Headcount" meta="940 · +18 QTD · attrition 7% (↓ 1.2pt)" />
      <DirRow icon="🎂" title="This week" meta="6 birthdays · 3 anniversaries" last />
    </Card>
  );
}

function DirRow({
  icon,
  title,
  meta,
  last,
}: {
  icon: string;
  title: string;
  meta: string;
  last?: boolean;
}) {
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
      <Box>
        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>{title}</Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{meta}</Typography>
      </Box>
    </Stack>
  );
}

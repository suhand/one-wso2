import { Box, Typography } from "@wso2/oxygen-ui";
import type { ReactNode } from "react";

// Small caps section divider with hairline rules on either side. Used to
// separate Hiring / Candidates / Performance / People / Ops within the
// People Ops canvas. The id becomes an anchor target for the side rail.
export default function SectionHeader({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <Typography
      id={id}
      component="h2"
      sx={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "text.disabled",
        fontWeight: 700,
        mt: 3,
        mb: 1.25,
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        scrollMarginTop: 14,
        "&::before": {
          content: '""',
          width: 14,
          height: "1px",
          bgcolor: "divider",
        },
        "&::after": {
          content: '""',
          flex: 1,
          height: "1px",
          bgcolor: "divider",
        },
      }}
    >
      <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
        {children}
      </Box>
    </Typography>
  );
}

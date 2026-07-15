import { Box, Chip, Typography } from "@wso2/oxygen-ui";
import type { ReactNode } from "react";

// 4-column responsive read-only field grid used by General + Personal
// info blocks — matches the people-app profile layout.
export interface FieldDef {
  label: string;
  value: ReactNode;
  chip?: { label: string; color: "primary" | "success" };
  span?: 1 | 2;
}

export default function FieldGrid({ fields }: { fields: FieldDef[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: "14px 22px",
      }}
    >
      {fields.map((f) => (
        <Box
          key={f.label}
          sx={{ minWidth: 0, gridColumn: f.span === 2 ? "span 2" : undefined }}
        >
          <Typography
            sx={{
              fontSize: 10.5,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "text.disabled",
              fontWeight: 600,
              mb: 0.375,
            }}
          >
            {f.label}
          </Typography>
          {f.chip ? (
            <Chip
              label={f.chip.label}
              color={f.chip.color}
              size="small"
              sx={{ height: 22, fontSize: 11, fontWeight: 600 }}
            />
          ) : (
            <Typography sx={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.35, wordWrap: "break-word" }}>
              {f.value}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

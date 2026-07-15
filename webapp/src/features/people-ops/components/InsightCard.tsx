import { Box, Typography } from "@wso2/oxygen-ui";

// The "Novera — insights" card that opens each perspective. Orange-tinted
// gradient overlay to signal it's AI-authored context, not a stat.
export default function InsightCard({
  text,
  source,
}: {
  text: string;
  source: string;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 1.5,
        p: "16px 18px",
        mb: 2,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: (t) =>
            `radial-gradient(560px 110px at 0 0, ${t.palette.primary.light}, transparent 60%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Typography
        sx={{
          position: "relative",
          fontSize: 11,
          fontWeight: 700,
          color: "primary.main",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          mb: 0.875,
        }}
      >
        ✦ Novera — insights
      </Typography>
      <Typography
        component="p"
        sx={{
          position: "relative",
          fontSize: 14,
          lineHeight: 1.55,
          color: "text.secondary",
          maxWidth: 780,
        }}
      >
        {text}
      </Typography>
      <Typography
        sx={{
          position: "relative",
          mt: 1,
          fontSize: 12,
          color: "text.disabled",
        }}
      >
        {source}
      </Typography>
    </Box>
  );
}

import { Box, Chip, IconButton } from "@wso2/oxygen-ui";

// Generic 3-piece pager used by Open Requisitions, Recent Joiners, and
// Candidates. Renders next to a card's h4-style heading.
export default function Pager({
  total,
  page,
  pageCount,
  onPrev,
  onNext,
}: {
  total: number | string;
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        textTransform: "none",
        letterSpacing: 0,
      }}
    >
      <Chip
        label={total}
        color="primary"
        size="small"
        sx={{ height: 20, fontSize: 10, fontWeight: 700 }}
      />
      <IconButton
        onClick={onPrev}
        disabled={page === 0}
        size="small"
        sx={{ width: 22, height: 22, fontSize: 14, border: 1, borderColor: "divider", borderRadius: 0.75 }}
      >
        ‹
      </IconButton>
      <Box
        sx={{
          fontVariantNumeric: "tabular-nums",
          minWidth: 30,
          textAlign: "center",
          fontSize: 11,
          color: "text.secondary",
          fontWeight: 600,
        }}
      >
        {page + 1} / {pageCount}
      </Box>
      <IconButton
        onClick={onNext}
        disabled={page >= pageCount - 1}
        size="small"
        sx={{ width: 22, height: 22, fontSize: 14, border: 1, borderColor: "divider", borderRadius: 0.75 }}
      >
        ›
      </IconButton>
    </Box>
  );
}

import { useMemo, useState } from "react";
import { Box, Button, Chip, Card, Typography, Stack } from "@wso2/oxygen-ui";
import { OPEN_REQUISITIONS } from "../constants/data";
import type { Requisition } from "../types";
import Funnel from "./Funnel";
import Pager from "./Pager";

const PAGE_SIZE = 3;
const TONE_MAP: Record<Requisition["status"], "warning" | "success" | "warning"> = {
  aging: "warning",
  "on-track": "success",
  draft: "warning",
};

export default function OpenRequisitions() {
  const [page, setPage] = useState(0);
  const items = OPEN_REQUISITIONS;
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visible = useMemo(
    () => items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [items, page],
  );

  return (
    <Card variant="outlined" sx={{ p: 2, minHeight: 460 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography
          sx={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          Open requisitions
        </Typography>
        <Pager
          total={items.length}
          page={page}
          pageCount={pageCount}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        />
      </Stack>

      {visible.map((r, idx) => (
        <Box
          key={r.id}
          sx={{
            py: 1.5,
            borderBottom: idx < visible.length - 1 ? 1 : 0,
            borderColor: "divider",
          }}
        >
          <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>
            {r.title} · {r.location}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ fontSize: 12, color: "text.secondary", mt: 0.25, mb: 1, flexWrap: "wrap" }}
          >
            {r.status === "draft" ? (
              <>
                <span>not published</span>
                <span>·</span>
                <span>{r.team}</span>
                <Chip
                  label="DRAFT"
                  color={TONE_MAP[r.status]}
                  size="small"
                  sx={{ height: 18, fontSize: 10.5, fontWeight: 600 }}
                />
              </>
            ) : (
              <>
                <span>{r.daysOpen} days open</span>
                <span>·</span>
                <span>{r.team}</span>
                <span>·</span>
                <span>owner {r.owner}</span>
                <Chip
                  label={r.status === "aging" ? "Aging" : "On track"}
                  color={r.status === "on-track" ? "success" : "warning"}
                  size="small"
                  sx={{ height: 18, fontSize: 10.5, fontWeight: 600 }}
                />
              </>
            )}
          </Stack>
          {r.funnel ? (
            <Funnel stages={r.funnel} />
          ) : (
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Button variant="contained" size="small">Publish</Button>
              <Button variant="outlined" size="small">Edit draft</Button>
            </Stack>
          )}
        </Box>
      ))}
    </Card>
  );
}

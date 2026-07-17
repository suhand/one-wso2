import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@wso2/oxygen-ui";
import { CANDIDATES } from "../constants/data";
import type { Candidate } from "../types";
import Pager from "./Pager";

const PAGE_SIZE = 4;
const STAGE_CHIP_COLOR: Record<Candidate["stageTone"], "error" | "warning" | "success" | "default"> = {
  crit: "error",
  watch: "warning",
  ok: "success",
  neutral: "default",
};
const SIGNAL_COLOR: Record<Candidate["signalTone"], string> = {
  pos: "success.main",
  neg: "error.main",
  neutral: "text.secondary",
};

export default function CandidatesTable() {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(CANDIDATES.length / PAGE_SIZE));
  const visible = useMemo(
    () => CANDIDATES.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [page],
  );

  return (
    <Card variant="outlined" sx={{ p: 2, minHeight: 400 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography
          sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600 }}
        >
          Candidates needing action
        </Typography>
        <Pager
          total={CANDIDATES.length}
          page={page}
          pageCount={pageCount}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        />
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", fontWeight: 600 }}>
              Candidate
            </TableCell>
            <TableCell sx={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", fontWeight: 600 }}>
              Role
            </TableCell>
            <TableCell sx={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", fontWeight: 600 }}>
              Stage
            </TableCell>
            <TableCell sx={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", fontWeight: 600 }}>
              Signal
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {visible.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 180 }}>
                  <Avatar sx={{ width: 28, height: 28, fontSize: 11, fontWeight: 700 }}>
                    {c.initials}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{c.name}</Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 11.5 }}>{c.background}</Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell sx={{ fontSize: 13 }}>{c.role}</TableCell>
              <TableCell>
                <Chip
                  label={c.stage}
                  color={STAGE_CHIP_COLOR[c.stageTone]}
                  size="small"
                  sx={{ height: 20, fontSize: 11, fontWeight: 600 }}
                />
              </TableCell>
              <TableCell sx={{ fontSize: 11.5, color: SIGNAL_COLOR[c.signalTone] }}>
                {c.signal}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant={c.actionPrimary ? "contained" : "outlined"}
                  size="small"
                  aria-label={`${c.actionLabel} ${c.name}`}
                >
                  {c.actionLabel}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

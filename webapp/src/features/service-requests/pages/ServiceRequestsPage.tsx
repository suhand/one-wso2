// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { Box, Button, Card, Chip, Stack, TextField, Typography } from "@wso2/oxygen-ui";
import DetailRow from "@components/detail-row/DetailRow";

type RecentTone = "ok" | "watch";
const TONE_CHIP_COLOR: Record<RecentTone, "success" | "warning"> = { ok: "success", watch: "warning" };

function StatusChip({ label, tone }: { label: string; tone: RecentTone }) {
  return (
    <Chip
      label={label}
      color={TONE_CHIP_COLOR[tone]}
      size="small"
      sx={{ height: 20, fontSize: 11, fontWeight: 600 }}
    />
  );
}

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
          <DetailRow icon="🖥" title="Infra: staging node" meta="approved · Infra Ops" trailing={<StatusChip label="Done" tone="ok" />} />
          <DetailRow icon="✉️" title="New group: one-design@" meta="pending" trailing={<StatusChip label="In review" tone="watch" />} />
          <DetailRow icon="💳" title="Expense $96" meta="reimbursed" trailing={<StatusChip label="Done" tone="ok" />} last />
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


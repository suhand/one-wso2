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

import { Box, Button, Card, Stack, Typography } from "@wso2/oxygen-ui";
import DetailRow from "@components/detail-row/DetailRow";
import { CAFETERIA_MENU } from "../constants/data";

// Three operational cards — people-ops-suite backends surfaced inside the
// perspective (leave-app, menu-app, people-app).
export default function OperationalServices() {
  return (
    <>
      <Typography
        sx={{ fontSize: 12.5, color: "text.secondary", mb: 1.25, lineHeight: 1.5 }}
      >
        People-ops-suite backends surfaced inside the perspective —{" "}
        <b>leave-app</b>, <b>menu-app</b>, <b>people-app</b>. No more separate portals.
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 1.75 }}>
        {/* Leave admin */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Leave · admin
          </Typography>
          <DetailRow
            icon="🌴"
            title="Pending approvals"
            meta="7 across your reports"
            trailing={<Button variant="contained" size="small" aria-label="Review pending leave approvals">Review</Button>}
          />
          <DetailRow icon="📅" title="On leave today" meta="3 in your team · 24 org-wide" />
          <DetailRow icon="📊" title="Balance forecast" meta="42 will forfeit >5 days at year-end" last />
        </Card>

        {/* Cafeteria & menu — 4 meal sections */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Cafeteria &amp; menu
          </Typography>
          {CAFETERIA_MENU.map((m, idx) => (
            <DetailRow
              key={m.meal}
              icon={m.icon}
              title={m.meal}
              meta={m.items}
              last={idx === CAFETERIA_MENU.length - 1}
            />
          ))}
        </Card>

        {/* Vehicle registry */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Vehicle registry
          </Typography>
          <DetailRow
            icon="🚗"
            title="New registrations"
            meta="4 this week · via people-app"
            trailing={<Button variant="outlined" size="small" aria-label="Review new vehicle registrations">Review</Button>}
          />
          <DetailRow icon="🅿" title="Parking utilization" meta="78% · Colombo HQ" />
          <DetailRow icon="🛠" title="Shuttle roster" meta="next revision Aug 1" last />
        </Card>
      </Box>

      {/* Consolidation footer */}
      <Card variant="outlined" sx={{ p: 2, mt: 1.75 }}>
        <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
          Why this perspective consolidates
        </Typography>
        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          {[
            { t: "Hiring", m: "reqs, pipeline, offers — one funnel" },
            { t: "Candidate history", m: "past fits & notes — no repeats" },
            { t: "Profiles & performance", m: "linked, not scattered" },
            { t: "Operational apps", m: "leave · menu · vehicles — embedded" },
          ].map((c) => (
            <Box
              key={c.t}
              sx={{ flex: 1, minWidth: 150, bgcolor: "action.hover", border: 1, borderColor: "divider", borderRadius: 1.25, p: 1.5 }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{c.t}</Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{c.m}</Typography>
            </Box>
          ))}
        </Stack>
      </Card>
    </>
  );
}


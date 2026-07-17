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

import { Box, Button, Card, Chip, Stack, Typography } from "@wso2/oxygen-ui";
import DetailRow from "@components/detail-row/DetailRow";

// Three cards surfacing adjacent people-ops-suite services inside the
// profile: Vehicles, Time off, Performance & growth.
//
// The values shown are illustrative sample data, NOT the signed-in user's
// records — the vehicles, leave balance, and review status here are
// placeholders until the per-service backends (people-app vehicles,
// leave-app, performance) are wired up. The "Sample data" chip on the
// section intro makes this explicit to the user.
export default function ConnectedServices() {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.5, flex: 1 }}>
          Adjacent services surfaced inside your profile — <b>people-app</b>{" "}
          (vehicles), <b>leave-app</b>, and your performance cycle. No separate
          portals.
        </Typography>
        <Chip
          label="Sample data"
          size="small"
          color="warning"
          variant="outlined"
          sx={{ height: 22, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em" }}
        />
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 1.75 }}>
        {/* Vehicles */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Vehicles
          </Typography>
          <DetailRow icon="🚗" title="CAB-4287" meta="Toyota Aqua" trailing={<Button variant="outlined" size="small">Manage</Button>} />
          <DetailRow icon="🏍" title="BAJ-1122" meta="Bajaj Pulsar" trailing={<Button variant="outlined" size="small">Manage</Button>} last />
        </Card>

        {/* Time off */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Time off
          </Typography>
          <DetailRow icon="🌴" title="Leave balance" meta="12 days annual · 4 casual · 7 sick" trailing={<Button variant="contained" size="small">Request</Button>} />
          <DetailRow icon="📅" title="Upcoming" meta="Aug 12–14 · approved" last />
        </Card>

        {/* Performance */}
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}>
            Performance &amp; growth
          </Typography>
          <Stack direction="row" spacing={1.25} sx={{ py: 1.125, borderBottom: 1, borderColor: "divider" }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                2026 H1 Review{" "}
                <Chip label="Submitted" color="success" size="small" sx={{ ml: 0.75, height: 20, fontSize: 11, fontWeight: 600 }} />
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Lead's PAR submission deadline approaching in 6 days
              </Typography>
            </Box>
            <Button variant="outlined" size="small">View</Button>
          </Stack>
          <Stack direction="row" spacing={1.25} sx={{ py: 1.125, alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>Last promoted date</Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Senior Forward Deployed Engineer II
              </Typography>
            </Box>
            <b style={{ fontVariantNumeric: "tabular-nums" }}>2024-07-01</b>
          </Stack>
        </Card>
      </Box>
    </>
  );
}


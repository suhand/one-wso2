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

import { Box, Typography } from "@wso2/oxygen-ui";
import type { FunnelStage } from "../types";

// Compact requisition funnel: Shortlisted → Screen → Interview → Offer.
// `.hot` (orange) marks the stage that most demands action; `.dim` marks
// empty stages. Non-actionable stages use neutral chrome.
export default function Funnel({ stages }: { stages: FunnelStage[] }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.625, flexWrap: "wrap" }}>
      {stages.map((s, i) => (
        <Box key={s.label} sx={{ display: "flex", alignItems: "center", gap: 0.625 }}>
          <StageTile stage={s} />
          {i < stages.length - 1 && (
            <Box component="span" sx={{ color: "divider", fontSize: 11 }}>→</Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

function StageTile({ stage }: { stage: FunnelStage }) {
  return (
    <Box
      sx={{
        bgcolor: stage.hot ? "primary.light" : "action.hover",
        border: 1,
        borderColor: stage.hot ? "primary.main" : "divider",
        borderRadius: 1,
        px: 1,
        py: 0.625,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 54,
        fontSize: 10,
        color: stage.hot ? "primary.main" : "text.secondary",
        gap: "1px",
        lineHeight: 1.15,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        opacity: stage.dim ? 0.55 : 1,
      }}
    >
      <Typography
        component="b"
        sx={{
          color: stage.hot ? "primary.main" : "text.primary",
          fontSize: 15,
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stage.count}
      </Typography>
      {stage.label}
    </Box>
  );
}

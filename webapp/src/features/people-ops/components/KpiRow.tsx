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
import { KPI_ROW } from "../constants/data";

const TONE_COLOR: Record<string, string> = {
  up: "success.main",
  crit: "error.main",
  watch: "warning.main",
  neutral: "text.disabled",
};

// Four-tile metric row. Mobile → 2 cols. Delta text takes a tone color.
export default function KpiRow() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 1.25,
        mb: 2,
      }}
    >
      {KPI_ROW.map((k) => (
        <Box
          key={k.label}
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            borderRadius: 1.5,
            p: "12px 14px",
          }}
        >
          <Typography
            sx={{
              fontSize: 10.5,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "text.disabled",
              fontWeight: 600,
            }}
          >
            {k.label}
          </Typography>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              mt: 0.5,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {k.value}
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: TONE_COLOR[k.tone], mt: 0.25 }}>
            {k.delta}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

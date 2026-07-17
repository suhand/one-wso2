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

import { Card, TextField, Typography } from "@wso2/oxygen-ui";
import DetailRow from "@components/detail-row/DetailRow";

export default function EmployeeDirectory() {
  return (
    <Card variant="outlined" sx={{ p: 2, minHeight: 480 }}>
      <Typography
        sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600, mb: 1.5 }}
      >
        Employee directory
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Search 940 employees — name, team, location…"
        sx={{ mb: 1 }}
      />
      <DetailRow icon="✦" title="Ask Novera suggested" meta='"Who owns Ballerina consulting delivery in EMEA?"' />
      <DetailRow icon="📊" title="Headcount" meta="940 · +18 QTD · attrition 7% (↓ 1.2pt)" />
      <DetailRow icon="🎂" title="This week" meta="6 birthdays · 3 anniversaries" last />
    </Card>
  );
}

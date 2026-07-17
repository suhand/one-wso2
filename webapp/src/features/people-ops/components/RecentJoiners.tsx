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

import { useMemo, useState } from "react";
import { Box, Card, Stack, Typography } from "@wso2/oxygen-ui";
import { RECENT_JOINERS } from "../constants/data";
import Pager from "./Pager";

const PAGE_SIZE = 4;

// Backend logic (see prototype notes): if the latest batch (last 1st/15th)
// has < 10 joiners, list up to 10 across batches; else show all from the
// latest batch. The mock data already reflects that "< 10 latest" case.
export default function RecentJoiners() {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(RECENT_JOINERS.length / PAGE_SIZE));
  const visible = useMemo(
    () => RECENT_JOINERS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [page],
  );

  return (
    <Card variant="outlined" sx={{ p: 2, minHeight: 480 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography
          sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary", fontWeight: 600 }}
        >
          Recent joiners
        </Typography>
        <Pager
          total={RECENT_JOINERS.length}
          page={page}
          pageCount={pageCount}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        />
      </Stack>

      {visible.map((j, idx) => (
        <Box
          key={j.id}
          sx={{
            py: 1.125,
            borderBottom: idx < visible.length - 1 ? 1 : 0,
            borderColor: "divider",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{j.name}</Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {j.designation} · {j.team}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {j.location} · Joined {j.joinedDate}
          </Typography>
        </Box>
      ))}
    </Card>
  );
}

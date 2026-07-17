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

import { useEffect, useRef } from "react";
import { Box, Typography, Button, Stack } from "@wso2/oxygen-ui";
import { useActivePerspective } from "@context/perspective/PerspectiveContext";

interface AskNoveraPaletteProps {
  onClose: () => void;
}

// The command-K palette. Static mock content matching the prototype —
// hooking this up to a real Novera backend is a separate future task.
export default function AskNoveraPalette({ onClose }: AskNoveraPaletteProps) {
  const active = useActivePerspective();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(10,10,11,.4)",
        backdropFilter: "blur(3px)",
        zIndex: 1300,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "absolute",
          top: 78,
          left: "50%",
          transform: "translateX(-50%)",
          width: 680,
          maxWidth: "92vw",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          boxShadow: 8,
          overflow: "hidden",
        }}
      >
        {/* Search input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: "15px 18px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: (t) =>
                `linear-gradient(135deg, ${t.palette.primary.main}, #ff9a6e)`,
            }}
          />
          <Box
            component="input"
            ref={inputRef}
            defaultValue="what's shipping this week"
            sx={{
              flex: 1,
              border: "none",
              outline: "none",
              bgcolor: "transparent",
              fontSize: 16,
              color: "text.primary",
              fontFamily: "inherit",
            }}
          />
          <Box
            sx={{
              fontSize: 11,
              color: "primary.main",
              bgcolor: "primary.light",
              borderRadius: 0.75,
              px: 1,
              py: 0.375,
              whiteSpace: "nowrap",
            }}
          >
            context: {active.label}
          </Box>
          <Box
            sx={{
              fontSize: 11,
              border: 1,
              borderColor: "divider",
              borderRadius: 0.75,
              px: 0.875,
              py: 0.375,
              color: "text.secondary",
            }}
          >
            esc
          </Box>
        </Box>

        {/* Results */}
        <Box sx={{ maxHeight: "54vh", overflowY: "auto", p: 1 }}>
          <Box
            sx={{
              bgcolor: "primary.light",
              border: 1,
              borderColor: "primary.main",
              borderRadius: 1.375,
              p: "13px 14px",
              m: 0.75,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                mb: 0.875,
              }}
            >
              ✦ NOVERA — scoped to {active.label}
            </Typography>
            <Typography sx={{ fontSize: 13.5, lineHeight: 1.5 }}>
              Novera integration is a stub in this UI mock. Wire this palette
              to the po-agent backend (or /query on a Choreo gateway) to
              answer live questions scoped to the {active.label} perspective.
            </Typography>
            <Stack direction="row" spacing={0.875} sx={{ mt: 1.125 }}>
              <Button variant="contained" size="small">Go</Button>
              <Button variant="outlined" size="small">Edit plan</Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

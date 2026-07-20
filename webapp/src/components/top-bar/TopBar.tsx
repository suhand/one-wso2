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

import { useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@wso2/oxygen-ui";
import { useThemeMode } from "@context/theme-mode/ThemeModeContext";
import UserProfileMenu from "./UserProfileMenu";

interface TopBarProps {
  onOpenWaffle: () => void;
  onOpenAsk: () => void;
}

// The persistent top bar. Left: One + WSO2 wordmark. Center: Ask Novera
// trigger. Right: waffle, theme toggle, avatar. The Ask Novera bar is a
// click target that opens the palette overlay; the ⌘K shortcut also fires
// it (wired here so it's available on every page).
export default function TopBar({ onOpenWaffle, onOpenAsk }: TopBarProps) {
  const { mode, toggle } = useThemeMode();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenAsk();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenAsk]);

  const logoSrc = mode === "dark" ? "/wso2-logo-white.svg" : "/wso2-logo-black.svg";

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      {/* Brand */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0}
        sx={{ width: 260, flexShrink: 0 }}
      >
        <Typography
          component="div"
          sx={{ fontWeight: 700, fontSize: 23, letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          One
        </Typography>
        <Box
          component="img"
          src={logoSrc}
          alt="WSO2"
          sx={{ height: 40, ml: "-4px" }}
        />
      </Stack>

      {/* Ask Novera bar */}
      <Box
        role="button"
        tabIndex={0}
        onClick={onOpenAsk}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenAsk();
          }
        }}
        sx={{
          flex: 1,
          maxWidth: 680,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          bgcolor: "action.hover",
          border: 1,
          borderColor: "divider",
          borderRadius: 1.5,
          px: 1.75,
          py: 1,
          color: "text.secondary",
          fontSize: 13.5,
          cursor: "text",
          transition: "border-color .15s",
          "&:hover": { borderColor: "text.disabled" },
        }}
      >
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: (t) =>
              `linear-gradient(135deg, ${t.palette.primary.main}, #ff9a6e)`,
            flexShrink: 0,
          }}
        />
        <span>Ask Novera or search…</span>
        <Box
          sx={{
            ml: "auto",
            fontSize: 11,
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            borderRadius: 0.75,
            px: 0.75,
            py: 0.25,
          }}
        >
          ⌘K
        </Box>
      </Box>

      {/* Right icons */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.75}
        sx={{ width: 200, justifyContent: "flex-end", flexShrink: 0 }}
      >
        <IconButton onClick={onOpenWaffle} title="Switch perspective">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
            <circle cx={5} cy={5} r={2} />
            <circle cx={12} cy={5} r={2} />
            <circle cx={19} cy={5} r={2} />
            <circle cx={5} cy={12} r={2} />
            <circle cx={12} cy={12} r={2} />
            <circle cx={19} cy={12} r={2} />
            <circle cx={5} cy={19} r={2} />
            <circle cx={12} cy={19} r={2} />
            <circle cx={19} cy={19} r={2} />
          </svg>
        </IconButton>
        <IconButton onClick={toggle} title="Theme">
          <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
            <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
          </svg>
        </IconButton>
        <UserProfileMenu />
      </Stack>
    </Box>
  );
}

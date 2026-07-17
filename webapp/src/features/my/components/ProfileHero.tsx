import { Avatar, Box, IconButton, Skeleton, Stack, Typography } from "@wso2/oxygen-ui";
import type { Employee, UserInfo } from "../api/types";
import { display, fullName, initialsOf } from "../api/derive";

// Orange-gradient hero header matching people-app's profile page. Left =
// large avatar + name; middle = pill row (ID, designation, email, BU);
// right = QR + Edit icon actions. Data comes from the /user-info +
// /employees/{id} responses; when either is absent (loading, error, or
// backend-not-configured) we render skeleton pills instead.
export default function ProfileHero({
  userInfo,
  employee,
  isLoading,
}: {
  userInfo?: UserInfo;
  employee?: Employee;
  isLoading?: boolean;
}) {
  const name = employee ? fullName(employee) : userInfo ? fullName(userInfo) : "";
  const initials = employee ? initialsOf(employee) : userInfo ? initialsOf(userInfo) : "";
  const thumbnail = employee?.employeeThumbnail ?? userInfo?.employeeThumbnail ?? null;

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 1.5,
        p: "20px 22px",
        mb: 1.75,
        display: "flex",
        alignItems: "center",
        gap: 2.25,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: (t) => `linear-gradient(120deg, ${t.palette.primary.light} 0%, transparent 55%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Avatar
        src={thumbnail ?? undefined}
        sx={{
          position: "relative",
          width: 78,
          height: 78,
          fontSize: 28,
          fontWeight: 700,
          background: (t) => `linear-gradient(135deg, ${t.palette.primary.main}, #ff8a5c)`,
          border: "3px solid",
          borderColor: "background.paper",
          boxShadow: "0 4px 14px rgba(241,78,35,.28)",
          flexShrink: 0,
        }}
      >
        {initials || "?"}
      </Avatar>

      <Box sx={{ position: "relative", flex: 1, minWidth: 0 }}>
        {isLoading && !name ? (
          <Skeleton variant="text" width={220} height={32} sx={{ mb: 0.875 }} />
        ) : (
          <Typography sx={{ fontSize: 23, fontWeight: 700, letterSpacing: "-0.02em", mb: 0.875 }}>
            {name || display(null)}
          </Typography>
        )}
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
          <HeroChip label="ID" value={display(employee?.employeeId ?? userInfo?.employeeId)} loading={isLoading} />
          <HeroChip
            label="Designation"
            value={display(employee?.designation ?? userInfo?.designation ?? null)}
            loading={isLoading}
          />
          <HeroChip label="Work email" value={display(employee?.workEmail ?? userInfo?.workEmail)} loading={isLoading} />
          <HeroChip label="Business unit" value={display(employee?.businessUnit)} loading={isLoading} />
        </Stack>
      </Box>

      {/* QR + Edit are placeholders — disabled until the corresponding
          people-app endpoints (QR reveal, profile edit) are wired up. */}
      <Stack direction="row" spacing={0.75} sx={{ position: "relative", flexShrink: 0 }}>
        <IconButton
          title="QR (coming soon)"
          aria-label="Show QR code (coming soon)"
          size="small"
          disabled
          sx={{ border: 1, borderColor: "divider", borderRadius: 1.125 }}
        >
          <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
            <rect x={3} y={3} width={7} height={7} rx={1} />
            <rect x={14} y={3} width={7} height={7} rx={1} />
            <rect x={3} y={14} width={7} height={7} rx={1} />
            <path d="M14 14h3v3h-3zM20 14h1v1h-1zM14 20h1v1h-1zM17 17h4v4" />
          </svg>
        </IconButton>
        <IconButton
          title="Edit profile (coming soon)"
          aria-label="Edit profile (coming soon)"
          size="small"
          disabled
          sx={{ border: 1, borderColor: "divider", borderRadius: 1.125 }}
        >
          <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
        </IconButton>
      </Stack>
    </Box>
  );
}

function HeroChip({ label, value, loading }: { label: string; value: string; loading?: boolean }) {
  return (
    <Box
      sx={{
        fontSize: 11.5,
        fontWeight: 500,
        px: 1.25,
        py: 0.5,
        borderRadius: 5,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        color: "text.secondary",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <b style={{ color: "inherit", fontWeight: 600, marginRight: 4 }}>{label}</b>
      {loading ? <Skeleton variant="text" width={90} sx={{ display: "inline-block" }} /> : value}
    </Box>
  );
}

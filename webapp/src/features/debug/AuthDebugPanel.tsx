import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tooltip,
  Typography,
} from "@wso2/oxygen-ui";
import { useAsgardeo } from "@asgardeo/react";
import { peopleBackendUrl } from "@config/apiConfig";

// Dev-only debug: floating pill at bottom-right that opens a dialog with
// the decoded id_token, so we can eyeball whether email + groups (the
// claims people-app's backend requires) are actually being issued.
//
// Only mounted in dev (import.meta.env.DEV). Nothing in this component
// makes a network request — it just decodes the JWT client-side. Payload
// is displayed in a monospace <pre> that scrolls, and a couple of quick
// verdict chips call out the two claims the backend cares about.
export default function AuthDebugPanel() {
  if (!import.meta.env.DEV) return null;
  return <AuthDebugPanelInner />;
}

interface DecodedToken {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
}

function AuthDebugPanelInner() {
  const { isSignedIn, getIdToken } = useAsgardeo();
  const [open, setOpen] = useState(false);
  const [rawToken, setRawToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !isSignedIn) return;
    let cancelled = false;
    setError(null);
    getIdToken()
      .then((t) => {
        if (cancelled) return;
        setRawToken(t ?? "");
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [open, isSignedIn, getIdToken]);

  const decoded = useMemo<DecodedToken | null>(() => {
    if (!rawToken) return null;
    try {
      const parts = rawToken.split(".");
      if (parts.length < 2) throw new Error("Not a JWT (expected header.payload.signature)");
      return {
        header: JSON.parse(b64urlDecode(parts[0])),
        payload: JSON.parse(b64urlDecode(parts[1])),
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return null;
    }
  }, [rawToken]);

  const email = decoded?.payload["email"];
  const groups = decoded?.payload["groups"];
  const hasEmail = typeof email === "string" && email.length > 0;
  const hasGroups = Array.isArray(groups) && groups.length > 0;

  return (
    <>
      <Tooltip title="Auth debug — decode id_token">
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: (t) => t.zIndex.tooltip + 1,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            boxShadow: 4,
            opacity: 0.9,
          }}
        >
          🔐 auth
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <span>Auth debug — id_token</span>
          <Chip
            size="small"
            label={isSignedIn ? "signed in" : "signed out"}
            color={isSignedIn ? "success" : "default"}
            sx={{ height: 20, fontSize: 10.5 }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Section title="Environment">
            <KVRow k="peopleBackendUrl" v={peopleBackendUrl || "(unset)"} mono />
          </Section>

          <Section title="Required by people-app backend">
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                label={hasEmail ? `email: ${email}` : "email missing"}
                color={hasEmail ? "success" : "error"}
              />
              <Chip
                size="small"
                label={hasGroups ? `groups: ${(groups as string[]).length}` : "groups missing"}
                color={hasGroups ? "success" : "error"}
              />
            </Stack>
            {hasGroups && (
              <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 1, fontFamily: "monospace" }}>
                {(groups as string[]).join(", ")}
              </Typography>
            )}
            <Typography sx={{ fontSize: 11.5, color: "text.disabled", mt: 1, lineHeight: 1.5 }}>
              The Ballerina <code>JwtInterceptor</code> in people-app decodes <code>x-jwt-assertion</code> and
              casts it to <code>{"{ email: string, groups: string[] }"}</code>. Both must be present or the
              request 500s with <em>Malformed Invoker info object!</em>.
            </Typography>
          </Section>

          {error && (
            <Section title="Error">
              <Typography sx={{ fontSize: 12.5, color: "error.main", fontFamily: "monospace" }}>{error}</Typography>
            </Section>
          )}

          <Section title="Decoded header">
            <Pre>{decoded ? pretty(decoded.header) : rawToken ? "decoding…" : "(no token yet)"}</Pre>
          </Section>

          <Section title="Decoded payload">
            <Pre>{decoded ? pretty(decoded.payload) : rawToken ? "decoding…" : "(no token yet)"}</Pre>
          </Section>

          <Section title="Raw token">
            <Pre wrap>{rawToken || "(no token yet — open this dialog while signed in)"}</Pre>
          </Section>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={() => {
              if (rawToken) void navigator.clipboard.writeText(rawToken);
            }}
            disabled={!rawToken}
          >
            Copy raw token
          </Button>
          <Button
            size="small"
            onClick={() => {
              if (decoded) void navigator.clipboard.writeText(pretty(decoded.payload));
            }}
            disabled={!decoded}
          >
            Copy payload
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button size="small" variant="contained" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "text.disabled",
          fontWeight: 700,
          mb: 0.75,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function KVRow({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, minWidth: 140 }}>{k}</Typography>
      <Typography sx={{ fontSize: 12, fontFamily: mono ? "monospace" : undefined, wordBreak: "break-all" }}>
        {v}
      </Typography>
    </Stack>
  );
}

function Pre({ children, wrap }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <Box
      component="pre"
      sx={{
        fontSize: 11.5,
        fontFamily: "monospace",
        bgcolor: "action.hover",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        p: 1.25,
        m: 0,
        maxHeight: 260,
        overflow: "auto",
        whiteSpace: wrap ? "pre-wrap" : "pre",
        wordBreak: wrap ? "break-all" : "normal",
      }}
    >
      {children}
    </Box>
  );
}

// base64url → utf8 string. Browser atob() doesn't accept the url-safe
// alphabet or missing padding, so we normalise first.
function b64urlDecode(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  // Convert binary string to UTF-8 (JWT payloads are UTF-8 JSON).
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function pretty(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}

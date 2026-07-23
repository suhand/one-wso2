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

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@wso2/oxygen-ui";
import { HttpError } from "@api/http";
import { useNotifications } from "@context/notifications/NotificationsContext";
import type { EmergencyContact } from "../api/types";
import { display } from "../api/derive";
import { useUpdatePersonalInfo } from "../api/useUpdatePersonalInfo";
import EditToggle from "./EditToggle";
import Pager from "@features/people-ops/components/Pager";

// Read mode paginates 2 rows per page; edit mode shows all rows so the
// user can work across their whole list without being interrupted by
// paging. No max-contacts cap — the backend has none.
const READ_PAGE_SIZE = 2;

// Emergency contacts card. Uses the same backend endpoint as PersonalInfo
// (PATCH /employees/{id}/personal-info) but only sends the emergencyContacts
// field. Backend replaces the whole array atomically, so a Save here rewrites
// the full list — deletes, edits, and adds all fold into one request.
export default function EmergencyContacts({
  contacts,
  employeeId,
  isLoading,
}: {
  contacts?: EmergencyContact[];
  employeeId?: string;
  isLoading?: boolean;
}) {
  const initial = useMemo<EmergencyContact[]>(() => normalize(contacts), [contacts]);
  const [form, setForm] = useState<EmergencyContact[]>(initial);
  const [editing, setEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mutation = useUpdatePersonalInfo(employeeId);
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    if (!editing) setForm(initial);
  }, [initial, editing]);

  if (!contacts && isLoading) {
    return (
      <Card variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={38} sx={{ borderRadius: 1 }} />
          ))}
        </Stack>
      </Card>
    );
  }

  const isDirty = JSON.stringify(form) !== JSON.stringify(initial);
  const badRow = form.find((c) => !c.name.trim() || !c.relationship.trim() || !c.mobile.trim());
  // Validate only when the array will actually be sent — pre-existing bad
  // data on the backend shouldn't block a save the user hasn't touched.
  const hasValidationError = isDirty && Boolean(badRow);
  const canSave = editing && isDirty && !hasValidationError && !mutation.isPending && Boolean(employeeId);

  const enterEdit = () => {
    setForm(initial);
    setError(null);
    setEditing(true);
  };
  const discardEdit = () => {
    setForm(initial);
    setError(null);
    setEditing(false);
  };
  const submit = () => {
    if (!canSave) return;
    setError(null);
    mutation.mutate(
      {
        emergencyContacts: form.map((c) => ({
          name: c.name.trim(),
          relationship: c.relationship.trim(),
          telephone: c.telephone && c.telephone.trim() !== "" ? c.telephone.trim() : null,
          mobile: c.mobile.trim(),
        })),
      },
      {
        onSuccess: () => {
          setEditing(false);
          showSuccess("Emergency contacts updated");
        },
        onError: (err) => {
          const msg = readableError(err);
          setError(msg);
          showError(msg);
        },
      },
    );
  };

  const pageCount = Math.max(1, Math.ceil(form.length / READ_PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount - 1);
  const visible = editing
    ? form
    : form.slice(clampedPage * READ_PAGE_SIZE, (clampedPage + 1) * READ_PAGE_SIZE);

  const addContact = () =>
    setForm((f) => [...f, { name: "", relationship: "", telephone: null, mobile: "" }]);

  return (
    <Card variant="outlined" sx={{ p: 2, position: "relative" }}>
      {/* Floating top-right cluster: pager (read mode only) + pencil/close.
          Sits in line with the first row of content instead of a full-width
          header row. */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          zIndex: 1,
        }}
      >
        {!editing && form.length > READ_PAGE_SIZE && (
          <Pager
            total={form.length}
            page={clampedPage}
            pageCount={pageCount}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          />
        )}
        <EditToggle
          editing={editing}
          canEdit={Boolean(employeeId)}
          pending={mutation.isPending}
          onEnter={enterEdit}
          onCancel={discardEdit}
        />
      </Box>

      {editing && <RequiredLegend />}
      {form.length > 0 && <GridHeader showRequired={editing} />}

      {form.length === 0 ? (
        <Typography sx={{ fontSize: 12.5, color: "text.disabled", py: 1.25 }}>
          {editing ? "No emergency contacts yet — click Add contact to add one." : "No emergency contacts on file."}
        </Typography>
      ) : editing ? (
        visible.map((c, idx) => (
          <EditRow
            key={idx}
            contact={c}
            onChange={(updated) =>
              setForm((f) => f.map((x, i) => (i === idx ? updated : x)))
            }
            onRemove={() => setForm((f) => f.filter((_, i) => i !== idx))}
            last={idx === visible.length - 1}
          />
        ))
      ) : (
        visible.map((c, idx) => (
          <ReadRow key={idx} contact={c} last={idx === visible.length - 1} />
        ))
      )}

      {editing && (
        <Button
          variant="outlined"
          size="small"
          onClick={addContact}
          startIcon={<PlusIcon />}
          sx={{
            mt: 1.25,
            fontSize: 12,
            fontWeight: 600,
            borderStyle: "dashed",
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": { bgcolor: "primary.light", borderStyle: "solid" },
          }}
        >
          Add contact
        </Button>
      )}

      {editing && (
        <>
          {error && (
            <Alert severity="error" sx={{ mt: 2, fontSize: 12.5 }}>
              {error}
            </Alert>
          )}
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            sx={{ mt: 2.25, pt: 1.75, borderTop: 1, borderColor: "divider" }}
          >
            <Button variant="outlined" size="small" onClick={discardEdit} disabled={mutation.isPending}>
              Discard changes
            </Button>
            <Button variant="contained" size="small" onClick={submit} disabled={!canSave}>
              {mutation.isPending ? "Saving…" : "Save changes"}
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
}

// ---- helpers ---------------------------------------------------------------

function normalize(contacts?: EmergencyContact[]): EmergencyContact[] {
  return (contacts ?? []).map((c) => ({
    name: c.name ?? "",
    relationship: c.relationship ?? "",
    telephone: c.telephone ?? null,
    mobile: c.mobile ?? "",
  }));
}

function readableError(err: Error): string {
  if (err instanceof HttpError && err.responseBody) {
    try {
      const parsed = JSON.parse(err.responseBody) as { message?: string };
      return parsed.message ?? err.responseBody;
    } catch {
      return err.responseBody;
    }
  }
  return err.message ?? "Failed to save changes";
}

// ---- subcomponents ---------------------------------------------------------

// Emergency-contact column headers. Red asterisks appear only when
// showRequired is true (edit mode) — asterisks mean "required" which is
// meaningless when the row is read-only.
function GridHeader({ showRequired }: { showRequired: boolean }) {
  const cols: Array<{ label: string; required: boolean }> = [
    { label: "Name", required: true },
    { label: "Relationship", required: true },
    { label: "Telephone", required: false },
    { label: "Mobile", required: true },
  ];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr 28px",
        gap: 1,
        pb: 0.5,
      }}
    >
      {cols.map((c) => (
        <Typography
          key={c.label}
          sx={{
            fontSize: 10.5,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "text.disabled",
            fontWeight: 600,
            px: 0.25,
          }}
        >
          {c.label}
          {showRequired && c.required && (
            <Box component="span" sx={{ color: "error.main", ml: 0.25 }} aria-hidden>
              *
            </Box>
          )}
        </Typography>
      ))}
      <span />
    </Box>
  );
}

function RequiredLegend() {
  return (
    <Typography
      sx={{ fontSize: 11, color: "text.disabled", fontStyle: "italic", mb: 0.5 }}
    >
      Fields marked{" "}
      <Box component="span" sx={{ color: "error.main", fontWeight: 700 }} aria-hidden>
        *
      </Box>{" "}
      are required.
    </Typography>
  );
}

function EditRow({
  contact,
  onChange,
  onRemove,
  last,
}: {
  contact: EmergencyContact;
  onChange: (updated: EmergencyContact) => void;
  onRemove: () => void;
  last: boolean;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr 28px",
        gap: 1,
        py: 1,
        alignItems: "center",
        borderBottom: last ? 0 : 1,
        borderColor: "divider",
      }}
    >
      <TextField
        size="small"
        value={contact.name}
        onChange={(e) => onChange({ ...contact, name: e.target.value })}
        placeholder="Full name"
      />
      <TextField
        size="small"
        value={contact.relationship}
        onChange={(e) => onChange({ ...contact, relationship: e.target.value })}
        placeholder="e.g. Spouse"
      />
      <TextField
        size="small"
        value={contact.telephone ?? ""}
        onChange={(e) => onChange({ ...contact, telephone: e.target.value })}
        placeholder="Optional"
      />
      <TextField
        size="small"
        value={contact.mobile}
        onChange={(e) => onChange({ ...contact, mobile: e.target.value })}
      />
      <IconButton
        size="small"
        aria-label="Remove contact"
        onClick={onRemove}
        sx={{
          width: 26,
          height: 26,
          border: 1,
          borderColor: "divider",
          borderRadius: 0.75,
          color: "text.secondary",
          "&:hover": { color: "error.main", borderColor: "error.main" },
        }}
      >
        <TrashIcon />
      </IconButton>
    </Box>
  );
}

function ReadRow({ contact, last }: { contact: EmergencyContact; last: boolean }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr 28px",
        gap: 1,
        py: 1.1,
        alignItems: "center",
        borderBottom: last ? 0 : 1,
        borderColor: "divider",
        fontSize: 13,
      }}
    >
      <span>{display(contact.name)}</span>
      <span>{display(contact.relationship)}</span>
      <span>{display(contact.telephone)}</span>
      <span>{display(contact.mobile)}</span>
      <span />
    </Box>
  );
}

function PlusIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <line x1={12} y1={5} x2={12} y2={19} />
      <line x1={5} y1={12} x2={19} y2={12} />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2" />
    </svg>
  );
}

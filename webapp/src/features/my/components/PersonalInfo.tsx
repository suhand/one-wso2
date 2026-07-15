import {
  Box,
  Button,
  Card,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@wso2/oxygen-ui";
import type { EmployeePersonalInfo } from "../api/types";
import { ageFromDob, display, formatDate } from "../api/derive";
import FieldGrid, { type FieldDef } from "./FieldGrid";

const MAX_EMERGENCY = 4;

// Personal info block: read-only identity fields on top, editable
// contact/address in the middle, emergency contacts + action bar below.
// The `id`s on Personal and Emergency headings are anchor targets for the
// side rail.
export default function PersonalInfo({
  personalInfo,
  isLoading,
}: {
  personalInfo?: EmployeePersonalInfo;
  isLoading?: boolean;
}) {
  if (!personalInfo) {
    return (
      <Card variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          {Array.from({ length: isLoading ? 6 : 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={38} sx={{ borderRadius: 1 }} />
          ))}
        </Stack>
      </Card>
    );
  }

  const p = personalInfo;
  const emergency = p.emergencyContacts ?? [];

  const readOnly: FieldDef[] = [
    { label: "Title", value: display(p.title) },
    { label: "First name", value: display(p.firstName) },
    { label: "Last name", value: display(p.lastName) },
    { label: "Full name", value: display(p.fullName) },
    { label: "NIC", value: display(p.nicOrPassport) },
    { label: "Date of birth", value: formatDate(p.dob) },
    { label: "Age", value: ageFromDob(p.dob) },
    { label: "Gender", value: display(p.gender) },
    { label: "Nationality", value: display(p.nationality) },
  ];

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <FieldGrid fields={readOnly} />

      <SubHeading title="Contact & address" note="editable" />
      <EditableGrid p={p} />

      <SubHeading
        id="my-emergency"
        title="Emergency contacts"
        note={`${emergency.length} / ${MAX_EMERGENCY}`}
      />
      <EmergencyGridHeader />
      {emergency.length === 0 ? (
        <Typography sx={{ fontSize: 12.5, color: "text.disabled", py: 1.25 }}>
          No emergency contacts on file.
        </Typography>
      ) : (
        emergency.map((c, idx) => (
          <EmergencyRow
            key={idx}
            name={c.name ?? ""}
            relationship={c.relationship ?? ""}
            telephone={c.telephone ?? ""}
            mobile={c.mobile ?? ""}
            last={idx === emergency.length - 1}
          />
        ))
      )}
      <Button
        variant="outlined"
        size="small"
        disabled={emergency.length >= MAX_EMERGENCY}
        sx={{
          mt: 1.25,
          fontSize: 12,
          fontWeight: 600,
          borderStyle: "dashed",
          borderColor: "primary.main",
          color: "primary.main",
          bgcolor: "primary.light",
          "&:hover": { bgcolor: "primary.main", color: "primary.contrastText", borderStyle: "solid" },
        }}
      >
        + Add contact
      </Button>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        sx={{ mt: 2.25, pt: 1.75, borderTop: 1, borderColor: "divider" }}
      >
        <Button variant="outlined" size="small">Discard changes</Button>
        <Button variant="contained" size="small">Save changes</Button>
      </Stack>
    </Card>
  );
}

function SubHeading({ id, title, note }: { id?: string; title: string; note?: string }) {
  return (
    <Typography
      id={id}
      sx={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "text.secondary",
        fontWeight: 700,
        mt: 2.25,
        mb: 1.25,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        scrollMarginTop: 14,
      }}
    >
      <span>{title}</span>
      {note && (
        <span style={{ fontSize: 11, fontWeight: 600, color: "inherit", textTransform: "none", letterSpacing: 0 }}>
          {note}
        </span>
      )}
    </Typography>
  );
}

function EditableGrid({ p }: { p: EmployeePersonalInfo }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: "14px 22px",
      }}
    >
      <LabelledInput label="Personal email" defaultValue={p.personalEmail ?? ""} />
      <LabelledInput label="Personal phone" defaultValue={p.personalPhone ?? ""} />
      <LabelledInput label="Resident number" defaultValue={p.residentNumber ?? ""} />
      <LabelledInput label="Postal code" defaultValue={p.postalCode ?? ""} />
      <LabelledInput label="Address line 1" defaultValue={p.addressLine1 ?? ""} span={2} />
      <LabelledInput label="Address line 2" defaultValue={p.addressLine2 ?? ""} span={2} />
      <LabelledInput label="City" defaultValue={p.city ?? ""} />
      <LabelledInput label="State / province" defaultValue={p.stateOrProvince ?? ""} />
      <LabelledInput label="Country" defaultValue={p.country ?? ""} />
    </Box>
  );
}

function LabelledInput({
  label,
  defaultValue,
  span,
}: {
  label: string;
  defaultValue: string;
  span?: 1 | 2;
}) {
  return (
    <Box sx={{ gridColumn: span === 2 ? "span 2" : undefined }}>
      <Typography
        sx={{
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "text.disabled",
          fontWeight: 600,
          mb: 0.375,
        }}
      >
        {label}
      </Typography>
      <TextField size="small" fullWidth defaultValue={defaultValue} />
    </Box>
  );
}

function EmergencyGridHeader() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr 28px",
        gap: 1,
        pb: 0.5,
      }}
    >
      {["Name", "Relationship", "Telephone", "Mobile"].map((h) => (
        <Typography
          key={h}
          sx={{
            fontSize: 10.5,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "text.disabled",
            fontWeight: 600,
            px: 0.25,
          }}
        >
          {h}
        </Typography>
      ))}
      <span />
    </Box>
  );
}

function EmergencyRow({
  name,
  relationship,
  telephone,
  mobile,
  last,
}: {
  name: string;
  relationship: string;
  telephone: string;
  mobile: string;
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
      <TextField size="small" defaultValue={name} />
      <TextField size="small" defaultValue={relationship} />
      <TextField size="small" defaultValue={telephone} />
      <TextField size="small" defaultValue={mobile} />
      <IconButton size="small" sx={{ width: 24, height: 24, border: 1, borderColor: "divider", borderRadius: 0.75 }}>
        ✕
      </IconButton>
    </Box>
  );
}

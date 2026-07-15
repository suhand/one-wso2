import { Card, Skeleton, Stack } from "@wso2/oxygen-ui";
import type { Employee } from "../api/types";
import { DASH, display, formatDate, fullName, serviceLength } from "../api/derive";
import FieldGrid, { type FieldDef } from "./FieldGrid";

// Renders the 22-field grid the people-app profile shows for General
// information. Values come straight from the Employee DTO; when the DTO
// is missing (loading / error) we render a skeleton grid of the same
// shape so the layout doesn't jump.
export default function GeneralInfo({
  employee,
  isLoading,
}: {
  employee?: Employee;
  isLoading?: boolean;
}) {
  if (!employee) {
    return (
      <Card variant="outlined" sx={{ p: 2 }}>
        <FieldGridSkeleton rows={isLoading ? 6 : 6} />
      </Card>
    );
  }

  const employmentType = display(employee.employmentType);
  const house = display(employee.house);
  const status = display(employee.employeeStatus);

  const fields: FieldDef[] = [
    { label: "Employee ID", value: display(employee.employeeId) },
    { label: "Name", value: fullName(employee) },
    { label: "Work email", value: display(employee.workEmail) },
    { label: "EPF", value: display(employee.epf) },

    { label: "Designation", value: display(employee.designation) },
    { label: "Job band", value: display(employee.jobBand) },
    { label: "Business unit", value: display(employee.businessUnit) },
    { label: "Team", value: display(employee.team) },

    { label: "Sub team", value: display(employee.subTeam) },
    { label: "Unit", value: display(employee.unit) },
    { label: "Company", value: display(employee.company) },
    { label: "Office", value: display(employee.office) },

    { label: "Work location", value: display(employee.workLocation) },
    ...(employmentType !== DASH
      ? [{ label: "Employment type", value: employmentType, chip: { label: employmentType, color: "primary" as const } }]
      : [{ label: "Employment type", value: DASH }]),
    ...(house !== DASH
      ? [{ label: "House", value: house, chip: { label: house, color: "primary" as const } }]
      : [{ label: "House", value: DASH }]),
    ...(status !== DASH
      ? [{
          label: "Employee status",
          value: status,
          chip: { label: status, color: /active/i.test(status) ? ("success" as const) : ("primary" as const) },
        }]
      : [{ label: "Employee status", value: DASH }]),

    { label: "Start date", value: formatDate(employee.startDate) },
    { label: "Length of service", value: serviceLength(employee.continuousServiceDate ?? employee.startDate) },
    { label: "Probation end date", value: formatDate(employee.probationEndDate) },
    { label: "Subordinates", value: display(employee.subordinateCount) },

    { label: "Lead email", value: display(employee.managerEmail), span: 2 },
    { label: "Additional lead emails", value: display(employee.additionalManagerEmails), span: 2 },
  ];

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <FieldGrid fields={fields} />
    </Card>
  );
}

function FieldGridSkeleton({ rows }: { rows: number }) {
  return (
    <Stack spacing={1.5}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={38} sx={{ borderRadius: 1 }} />
      ))}
    </Stack>
  );
}

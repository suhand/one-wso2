// DTOs from the people-ops-suite people-app backend, copied verbatim so
// field names match the wire format. If people-app's contract changes,
// mirror the change here. Source of truth:
//   src/slices/authSlice/auth.ts       (UserInfoInterface)
//   src/slices/employeeSlice/employee.ts (Employee)
//   src/slices/employeeSlice/employeePersonalInfo.ts (EmployeePersonalInfo)
//   src/types/types.tsx                 (EmergencyContact)

export interface UserInfo {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  employeeThumbnail: string | null;
  designation: string | null;
  privileges: number[];
}

export type EmployeeStatus = string; // people-app has an enum; keep loose here

export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  employeeThumbnail: string | null;
  secondaryJobTitle: string | null;
  jobRole: string | null;
  epf: string;
  workLocation: string;
  startDate: string;
  managerEmail: string;
  managerName: string | null;
  additionalManagerEmails: string | null;
  gender: string | null;
  continuousServiceDate: string | null;
  jobBand: number | null;
  employeeStatus: EmployeeStatus;
  probationEndDate: string | null;
  agreementEndDate: string | null;
  resignationDate: string | null;
  finalDayInOffice: string | null;
  finalDayOfEmployment: string | null;
  resignationReason: string | null;
  employmentType: string;
  designation: string;
  company: string;
  office: string | null;
  businessUnit: string;
  team: string;
  subTeam: string | null;
  unit: string | null;
  subordinateCount: number;
  employmentTypeId: number;
  careerFunctionId: number;
  designationId: number;
  companyId: number;
  officeId: number | null;
  businessUnitId: number;
  teamId: number;
  subTeamId: number | null;
  unitId: number | null;
  house: string | null;
  houseId: number | null;
}

export interface EmergencyContact {
  name: string | null;
  relationship: string | null;
  telephone: string | null;
  mobile: string | null;
}

export interface EmployeePersonalInfo {
  id: number;
  nicOrPassport: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  dob: string;
  gender: string;
  personalEmail: string | null;
  personalPhone: string | null;
  residentNumber: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  stateOrProvince: string | null;
  postalCode: string | null;
  country: string | null;
  nationality: string;
  emergencyContacts: EmergencyContact[] | null;
}

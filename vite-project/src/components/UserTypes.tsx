import { Database } from "../types/supabase";

export type UserType = Database["public"]["Enums"]["user_type_enum"];

export interface userTypeFields {
  code: string;
  name: string;
  inputs: Array<Input> | undefined;
  userType: UserType;
}

export interface Input {
  name: string;
  id: string;
  type: string;
}

// export type userSpecificData = Map<UserType, Database>;
// {
//   ("");
// }
// Database['public']['Tables']['lab_user'];

export type userData = Database["public"]["Tables"]["user"]["Row"];
export type LabOrder = Database["public"]["Tables"]["lab_order"]["Row"];
export type Brand = Database["public"]["Tables"]["brand"]["Row"];
export type Batch = Database["public"]["Tables"]["batch"]["Row"];
export type Analysis = Database["public"]["Tables"]["analysis"]["Row"];
export type MoleculePredict =
  Database["public"]["Tables"]["molecule_prediction"]["Row"];

export type LabOrderTableRow = LabOrder & {
  status: string;
};

export type ForApproval = {
  lab_name: string | null;
  brand_name: string | null;
  molecules: Array<MoleculePredict> | null;
  pass: boolean;
  sku: string | null;
  analysis_id: string;
};

export type AnalysisTableRow = ForApproval & {
  status: string;
};

//all user types
export type govUser = Database["public"]["Tables"]["regulator_user"]["Row"];
export type labUser = Database["public"]["Tables"]["lab_user"]["Row"];
export type eduUser = Database["public"]["Tables"]["university_user"]["Row"];
export type prodUser = Database["public"]["Tables"]["producer_user"]["Row"];

//Hardcoded types
export const userSpecificInputs: Map<UserType, Array<Input>> = new Map([
  [
    "regulator",
    [
      { name: "Regulator Name", id: "regulator_name", type: "text" },
      { name: "Mailing Address", id: "regulator_address", type: "text" },
      { name: "Contact Phone", id: "regulator_contact_phone", type: "tel" },
    ],
  ],
  [
    "lab",
    [
      { name: "Lab Name", id: "lab_name", type: "text" },
      { name: "Lab Address", id: "lab_address", type: "text" },
      { name: "Lab License Number", id: "lab_license_number", type: "text" },
      { name: "Lab Owner Name", id: "owner_name", type: "text" },
      { name: "Contact Phone", id: "lab_contact_phone", type: "text" },
    ],
  ],
  [
    "producer",
    [
      { name: "Legal Name", id: "legal_name", type: "text" },
      { name: "DBA or Common Name", id: "common_name", type: "text" },
      {
        name: "Facility Address",
        id: "primary_facility_address",
        type: "text",
      },
      { name: "Billing Address", id: "billing_address", type: "text" },
      { name: "License Number", id: "producer_license_number", type: "text" },
      { name: "License Type", id: "license_type", type: "text" },
      { name: "Contact Phone", id: "producer_contact_phone", type: "tel" },
    ],
  ],
  [
    "university",
    [
      { name: "University Name", id: "university_name", type: "text" },
      {
        name: "University Department",
        id: "university_department",
        type: "text",
      },
      {
        name: "Primary Investigator",
        id: "primary_investigator",
        type: "text",
      },
      { name: "Lab Address", id: "university_lab_address", type: "text" },
    ],
  ],
  ["consumer", []],
]);

export const users: Array<userTypeFields> = [
  {
    name: "University/Research",
    code: "edu",
    inputs: userSpecificInputs.get("university"),
    userType: "university",
  },
  {
    name: "Lab owner",
    code: "lab",
    inputs: userSpecificInputs.get("lab"),
    userType: "lab",
  },
  {
    name: "Producer",
    code: "leaf",
    inputs: userSpecificInputs.get("producer"),
    userType: "producer",
  },
  {
    name: "Regulator",
    code: "gov",
    inputs: userSpecificInputs.get("regulator"),
    userType: "regulator",
  },
  {
    name: "Base User",
    code: "person",
    inputs: userSpecificInputs.get("consumer"),
    userType: "consumer",
  },
];

export const generalInputs: Array<Input> = [
  { name: "First Name", id: "firstName", type: "text" },
  { name: "Last Name", id: "lastName", type: "text" },
  { name: "Email", id: "email", type: "email" },
  { name: "Password", id: "password", type: "password" },
  { name: "Phone Number", id: "phone", type: "tel" },
];

export const labOrderInputs: Array<Input> = [
  { name: "Pickup location of the order", id: "location", type: "text" },
  { name: "Pickup date", id: "pickup_date", type: "date" },
  { name: "Brand name", id: "brand_name", type: "text" },
  {
    name: "Please write a description of the strain",
    id: "strain_info",
    type: "text",
  },
];

export const NOT_CLAIMED = "Not Claimed";
export const CLAIMED = "Claimed";
export const NOT_APPROVED = "Not Approved";
export const APPROVED = "Approved";

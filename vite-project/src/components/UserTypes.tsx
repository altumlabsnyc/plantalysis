import { Database } from "../types/supabase";

export enum UserType {
  Base = "Base",
  Producer = "Producer",
  Regulator = "Regulator",
  University = "University",
  Lab = "Lab",
}

export interface userTypeFields {
  code: string;
  name: string;
  inputs: Array<Input>;
  userType: UserType;
}

export interface Input {
  name: string;
  id: string;
  type: string;
}

// export interface userData {
//   id: string;
//   first_name: String;
//   last_name: string;
//   email: string;
//   mfa_phone: string;
//   user_type: UserType;
// }

export type userData = Database["public"]["Tables"]["user"]["Row"];
//Hardcoded types
export const userSpecificInputs: { [key: string]: Input[] } = {
  gov: [
    { name: "Regulator Name", id: "regName", type: "text" },
    { name: "Mailing Address", id: "regAddress", type: "text" },
  ],
  lab: [
    { name: "Lab Name", id: "labName", type: "text" },
    { name: "Lab Address", id: "labAddress", type: "text" },
    { name: "Lab License Number", id: "labLicense", type: "text" },
    { name: "Lab Owner Name", id: "labOwner", type: "text" },
  ],
  leaf: [
    { name: "Legal Name", id: "legalName", type: "text" },
    { name: "DBA or Common Name", id: "dbaName", type: "text" },
    { name: "Facility Address", id: "prodAddress", type: "text" },
    { name: "Billing Address", id: "billAdress", type: "text" },
    { name: "License Number", id: "prodLicense", type: "text" },
  ],
  edu: [
    { name: "University Name", id: "uniName", type: "text" },
    { name: "University Department", id: "dept", type: "text" },
    { name: "Primary Investigator", id: "pi", type: "text" },
    { name: "Lab Address", id: "uniAddress", type: "text" },
  ],
  person: [],
};

export const users: Array<userTypeFields> = [
  {
    name: "university/researcher",
    code: "edu",
    inputs: userSpecificInputs.edu,
    userType: UserType.University,
  },
  {
    name: "lab",
    code: "lab",
    inputs: userSpecificInputs.lab,
    userType: UserType.Lab,
  },
  {
    name: "producer",
    code: "leaf",
    inputs: userSpecificInputs.leaf,
    userType: UserType.Producer,
  },
  {
    name: "regulator",
    code: "gov",
    inputs: userSpecificInputs.gov,
    userType: UserType.Regulator,
  },
  {
    name: "individual consumer",
    code: "person",
    inputs: userSpecificInputs.person,
    userType: UserType.Base,
  },
];

export const generalInputs: Array<Input> = [
  { name: "First Name", id: "firstName", type: "text" },
  { name: "Last Name", id: "lastName", type: "text" },
  { name: "Email", id: "email", type: "email" },
  { name: "Password", id: "password", type: "password" },
  { name: "Phone Number", id: "phone", type: "tel" },
];

import { Database } from "../types/supabase";

// export enum UserType {
//   Base = "Base",
//   Producer = "Producer",
//   Regulator = "Regulator",
//   University = "University",
//   Lab = "Lab",
// }

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

//Hardcoded types
export const userSpecificInputs: Map<UserType, Array<Input>> = new Map([
  [
    "regulator",
    [
      { name: "Regulator Name", id: "regName", type: "text" },
      { name: "Mailing Address", id: "regAddress", type: "text" },
    ],
  ],
  [
    "lab",
    [
      { name: "Lab Name", id: "labName", type: "text" },
      { name: "Lab Address", id: "labAddress", type: "text" },
      { name: "Lab License Number", id: "labLicense", type: "text" },
      { name: "Lab Owner Name", id: "labOwner", type: "text" },
    ],
  ],
  [
    "producer",
    [
      { name: "Legal Name", id: "legalName", type: "text" },
      { name: "DBA or Common Name", id: "dbaName", type: "text" },
      { name: "Facility Address", id: "prodAddress", type: "text" },
      { name: "Billing Address", id: "billAdress", type: "text" },
      { name: "License Number", id: "prodLicense", type: "text" },
    ],
  ],
  [
    "university",
    [
      { name: "University Name", id: "uniName", type: "text" },
      { name: "University Department", id: "dept", type: "text" },
      { name: "Primary Investigator", id: "pi", type: "text" },
      { name: "Lab Address", id: "uniAddress", type: "text" },
    ],
  ],
  ["consumer", []],
]);

export const users: Array<userTypeFields> = [
  {
    name: "university/researcher",
    code: "edu",
    inputs: userSpecificInputs.get("university"),
    userType: "university",
  },
  {
    name: "lab",
    code: "lab",
    inputs: userSpecificInputs.get("lab"),
    userType: "lab",
  },
  {
    name: "producer",
    code: "leaf",
    inputs: userSpecificInputs.get("producer"),
    userType: "producer",
  },
  {
    name: "regulator",
    code: "gov",
    inputs: userSpecificInputs.get("regulator"),
    userType: "regulator",
  },
  {
    name: "individual consumer",
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

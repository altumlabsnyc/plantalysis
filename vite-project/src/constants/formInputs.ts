import Input, { userTypeFields } from '@/types/Input'
import { UserRole } from '@/types/supabaseAlias'

/**
 * Interface to display the different users when registrating in Registration.tsx
 * Connects the UserRole to the icon it should display, the name it should display and
 * an array of Inputs that it should ask the user registering when selecting a specific
 * UserRole
 */

/**
 * Map from UserRole to its Inputs specific to that UserRole when registering
 */

export const userSpecificInputs: Map<UserRole, Array<Input>> = new Map([
  [
    'regulator',
    [
      { name: 'Regulator Name', id: 'regulator_name', type: 'text' },
      { name: 'Mailing Address', id: 'regulator_address', type: 'text' },
      { name: 'Contact Phone', id: 'regulator_contact_phone', type: 'tel' },
    ],
  ],
  [
    'lab',
    [
      { name: 'Lab Name', id: 'lab_name', type: 'text' },
      { name: 'Lab Address', id: 'lab_address', type: 'text' },
      { name: 'Lab License Number', id: 'lab_license_number', type: 'text' },
      { name: 'Lab Owner Name', id: 'owner_name', type: 'text' },
      { name: 'Contact Phone', id: 'lab_contact_phone', type: 'tel' },
    ],
  ],
  [
    'producer',
    [
      { name: 'Legal Name', id: 'legal_name', type: 'text' },
      { name: 'DBA or Common Name', id: 'common_name', type: 'text' },
      {
        name: 'Facility Address',
        id: 'primary_facility_address',
        type: 'text',
      },
      {
        name: 'License Type',
        id: 'license_type',
        type: 'radio',
        options: ['AUCC', 'AUCP', 'AUHC'],
      },
      { name: 'License Prefix', id: 'license_prefix', type: 'text' },
      { name: 'License Number', id: 'license_number', type: 'text' },
    ],
  ],
  [
    'university',
    [
      { name: 'University Name', id: 'university_name', type: 'text' },
      {
        name: 'University Department',
        id: 'university_department',
        type: 'text',
      },
      {
        name: 'Primary Investigator',
        id: 'primary_investigator',
        type: 'text',
      },
      { name: 'Lab Address', id: 'university_lab_address', type: 'text' },
    ],
  ],
  ['consumer', []],
])

/**
 * Array that connects the UserTypeFields with specific existing users in supabase
 * that users can select to register as.
 */
export const users: Array<userTypeFields> = [
  {
    name: 'University/Research',
    code: 'edu',
    inputs: userSpecificInputs.get('university'),
    userType: 'university',
  },
  {
    name: 'Lab',
    code: 'lab',
    inputs: userSpecificInputs.get('lab'),
    userType: 'lab',
  },
  {
    name: 'Producer',
    code: 'leaf',
    inputs: userSpecificInputs.get('producer'),
    userType: 'producer',
  },
  {
    name: 'Regulator',
    code: 'gov',
    inputs: userSpecificInputs.get('regulator'),
    userType: 'regulator',
  },
  // {
  //   name: 'Base User',
  //   code: 'person',
  //   inputs: userSpecificInputs.get('consumer'),
  //   userType: 'consumer',
  // },
]

/**
 * Inputs for every BaseUser
 */
export const generalInputs: Array<Input> = [
  { name: 'First Name', id: 'firstName', type: 'text' },
  { name: 'Last Name', id: 'lastName', type: 'text' },
  { name: 'Email', id: 'email', type: 'email' },
  { name: 'Password', id: 'password', type: 'password' },
  { name: 'Confirm Password', id: 'confirm_password', type: 'password' },
  { name: 'Phone Number', id: 'phone', type: 'tel' },
]

/**
 * Inputs to place a new lab order for producers
 */
export const labOrderInputs: Array<Input> = [
  { name: 'Pickup location of the order', id: 'location', type: 'text' },
  { name: 'Pickup date', id: 'pickup_date', type: 'date' },
  { name: 'Brand name', id: 'brand_name', type: 'text' },
  {
    name: 'Please write a description of the strain',
    id: 'strain_info',
    type: 'text',
  },
]

/**
 * Inputs to add a new brand for producers
 */
export const brandInputs: Array<Input> = [
  { name: 'Brand Name', id: 'brand_name', type: 'text' },
  { name: 'Serving Size', id: 'serving_size', type: 'number' },
  { name: 'Path to logo', id: 'img_path', type: 'file' },
  {
    name: 'Test Options',
    id: 'option_ABC',
    type: 'radio',
    options: ['a', 'b', 'c'],
  },
  {
    name: 'Test DropDown',
    id: 'drop_down',
    type: 'dropdown',
    options: ['a', 'b', 'c'],
  },
]

/**
 * Inputs to add a new facility as producer
 */
export const facilityInputs: Array<Input> = [
  { name: 'Address', id: 'address', type: 'text' },
  { name: 'Facility Name', id: 'facility_name', type: 'text' },
  { name: 'Description', id: 'description', type: 'text' },
]

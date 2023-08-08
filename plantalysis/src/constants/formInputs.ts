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
      { name: 'Contact Phone', id: 'regulator_contact_phone', type: 'text' },
      {
        name: 'Mailing Address Address Line 1',
        id: 'mailing_address_line_1',
        type: 'text',
      },
      {
        name: 'Mailing Address City',
        id: 'mailing_address_city',
        type: 'text',
      },
      {
        name: 'Mailing Address State',
        id: 'mailing_address_state',
        type: 'text',
        props: { defaultValue: 'NY', disabled: true },
      },
      {
        name: 'Mailing Address Zip',
        id: 'mailing_address_zip',
        type: 'text',
      },
    ],
  ],
  [
    'lab',
    [
      { name: 'Lab Name', id: 'lab_name', type: 'text' },
      { name: 'Lab Address Line 1', id: 'lab_address_line_1', type: 'text' },
      { name: 'Lab City', id: 'lab_address_city', type: 'text' },
      {
        name: 'Lab State',
        id: 'lab_address_state_display',
        type: 'text',
        props: { defaultValue: 'NY', disabled: true },
      },
      { name: 'Lab Zip', id: 'lab_address_zip', type: 'text' },
      { name: 'Lab License Number', id: 'lab_license_number', type: 'text' },
      { name: 'Lab Owner Name', id: 'owner_name', type: 'text' },
      { name: 'Contact Phone', id: 'lab_contact_phone', type: 'tel' },
    ],
  ],
  [
    'producer',
    [
      { name: 'Legal Company Name', id: 'legal_name', type: 'text' },
      { name: 'DBA or Common Name', id: 'common_name', type: 'text' },
      {
        name: 'Facility Address Line 1',
        id: 'facility_address_line_1',
        type: 'text',
      },
      { name: 'Facility City', id: 'facility_address_city', type: 'text' },
      {
        name: 'Facility State',
        id: 'facility_address_state',
        type: 'text',
        props: { defaultValue: 'NY', disabled: true },
      },
      { name: 'Facility Zip', id: 'facility_address_zip', type: 'text' },
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
    'sampling_firm',
    [
      { name: 'Legal Company Name', id: 'legal_name', type: 'text' },
      {
        name: 'Primary Center Address Line 1',
        id: 'primary_center_line_1',
        type: 'text',
      },
      {
        name: 'Primary Center City',
        id: 'primary_center_city',
        type: 'text',
      },
      {
        name: 'Primary Center State',
        id: 'primary_center_state',
        type: 'text',
        props: { defaultValue: 'NY', disabled: true },
      },
      { name: 'Primary Center Zip', id: 'primary_center_zip', type: 'text' },
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
      {
        name: 'University Lab Address Line 1',
        id: 'university_lab_address_line_1',
        type: 'text',
      },
      {
        name: 'University Lab City',
        id: 'university_lab_address_city',
        type: 'text',
      },
      {
        name: 'University Lab State',
        id: 'university_lab_address_state',
        type: 'text',
        props: { defaultValue: 'NY', disabled: true },
      },
      {
        name: 'University Lab Zip',
        id: 'university_lab_address_zip',
        type: 'text',
      },
      // { name: 'Lab Address', id: 'university_lab_address', type: 'text' },
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
    name: 'Producer',
    code: 'leaf',
    inputs: userSpecificInputs.get('producer'),
    userType: 'producer',
  },
  {
    name: 'Sampling Firm',
    code: 'delivery',
    inputs: userSpecificInputs.get('sampling_firm'),
    userType: 'sampling_firm',
  },
  {
    name: 'Lab',
    code: 'lab',
    inputs: userSpecificInputs.get('lab'),
    userType: 'lab',
  },
  {
    name: 'Regulator',
    code: 'gov',
    inputs: userSpecificInputs.get('regulator'),
    userType: 'regulator',
  },
  {
    name: 'University/Research',
    code: 'edu',
    inputs: userSpecificInputs.get('university'),
    userType: 'university',
  },

  // {
  //   name: 'Base User',
  //   code: 'person',
  //   inputs: userSpecificInputs.get('consumer'),
  //   userType: 'consumer',
  // }, hello
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

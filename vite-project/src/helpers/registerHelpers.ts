import {
  Address,
  LabUser,
  ProducerUser,
  RegulatorUser,
  UniversityUser,
} from '@/types/supabaseAlias'
import toE164 from '@/utils/toE164'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

/**
 * Scrape data from the Material UI form for lab signup.
 *
 * @param data data from form
 * @returns required information to onboard a lab user, or undefined if some data is missing
 */
export function getLabSignupInfoFromForm(
  data: FormData,
): (LabUser & { address: Address }) | undefined {
  const id = ''
  const lab_name = data.get('lab_name')?.toString() || null
  const lab_address_line_1 = data.get('lab_address_line_1')?.toString() || null
  const lab_address_state = data.get('lab_address_state')?.toString() || 'NY'
  const lab_address_city = data.get('lab_address_city')?.toString() || null
  const lab_address_zip = data.get('lab_address_zip')?.toString() || null
  const license_number = data.get('lab_license_number')?.toString() || null
  const owner_name = data.get('owner_name')?.toString() || null
  let contact_phone = data.get('lab_contact_phone')?.toString() || null

  console.log(
    lab_name,
    lab_address_line_1,
    lab_address_state,
    lab_address_city,
    lab_address_zip,
    license_number,
    owner_name,
    contact_phone,
  )

  // return errors if any of the required fields are missing
  if (
    !lab_name ||
    !lab_address_line_1 ||
    !lab_address_state ||
    !lab_address_city ||
    !lab_address_zip ||
    !license_number ||
    !owner_name ||
    !contact_phone
  ) {
    toast.error('Please fill out all required fields')
    return undefined
  }

  try {
    contact_phone = toE164(contact_phone)
  } catch (error) {
    toast.error('Please enter a valid phone number')
    return undefined
  }

  const lab_address: Address = {
    id: uuidv4(),
    line_1: lab_address_line_1,
    line_2: null,
    state_code: lab_address_state,
    country_code: 'USA',
    city: lab_address_city,
    postal_code: lab_address_zip,
  }

  const labData: LabUser = {
    contact_phone: contact_phone,
    lab_name: lab_name,
    id: id,
    owner_name: owner_name,
    license_number: license_number,
  }
  return {
    ...labData,
    address: lab_address,
  }
}

/**
 * Scrape data from the Material UI form for producer signup.
 *
 * @param data data from form
 * @returns required information to onboard a producer user, or undefined if some data is missing
 */
export function getProducerSignUpInfoFromForm(
  data: FormData,
  license_number: string,
): (ProducerUser & { address: Address }) | undefined {
  const id = ''
  const legal_name = data.get('legal_name')?.toString() || null
  const common_name = data.get('common_name')?.toString() || null
  const facility_address_line_1 =
    data.get('facility_address_line_1')?.toString() || null
  const facility_address_state =
    data.get('facility_address_state')?.toString() || 'NY'
  const facility_address_city =
    data.get('facility_address_city')?.toString() || null
  const facility_address_zip =
    data.get('facility_address_zip')?.toString() || null
  const license_type = data.get('license_type')?.toString() || null
  // TODO: fix Radio for license type instead of expecting that input
  const actualLicenseType =
    license_type == 'AUCC' || license_type == 'AUCP' || license_type == 'AUHC'
      ? license_type
      : null
  let contact_phone = data.get('producer_contact_phone')?.toString() || null

  if (
    legal_name == null ||
    common_name == null ||
    facility_address_line_1 == null ||
    facility_address_state == null ||
    facility_address_city == null ||
    facility_address_zip == null ||
    actualLicenseType == null ||
    license_number == null ||
    contact_phone == null
  ) {
    toast.error('Please fill out all fields')
    return undefined
  }

  try {
    contact_phone = toE164(contact_phone)
  } catch (error) {
    toast.error('Please enter a valid phone number')
    return undefined
  }

  const facility_address: Address = {
    id: uuidv4(),
    line_1: facility_address_line_1,
    line_2: null,
    state_code: facility_address_state,
    country_code: 'USA',
    city: facility_address_city,
    postal_code: facility_address_zip,
  }

  const prodData: ProducerUser = {
    legal_name: legal_name,
    common_name: common_name,
    license_type: actualLicenseType,
    license_number: license_number,
    id: id,
  }

  return {
    ...prodData,
    address: facility_address,
  }
}

/**
 * Scrape data from the Material UI form for university signup.
 *
 * @param data data from form
 * @returns required information to onboard a university user, or undefined if some data is missing
 */
export function getUniversitySignUpInfoFromForm(data: FormData):
  | (UniversityUser & {
      address: Address
    })
  | undefined {
  const id = ''
  const university_name = data.get('university_name')?.toString() || null
  const university_department =
    data.get('university_department')?.toString() || null
  const primary_investigator =
    data.get('primary_investigator')?.toString() || null
  const university_lab_address_line_1 =
    data.get('university_lab_address_line_1')?.toString() || null
  const university_lab_address_state =
    data.get('university_lab_address_state')?.toString() || 'NY'
  const university_lab_address_city =
    data.get('university_lab_address_city')?.toString() || null
  const university_lab_address_zip =
    data.get('university_lab_address_zip')?.toString() || null

  console.log(
    university_name,
    university_department,
    primary_investigator,
    university_lab_address_line_1,
    university_lab_address_state,
    university_lab_address_city,
    university_lab_address_zip,
  )

  if (
    university_name == null ||
    university_department == null ||
    primary_investigator == null ||
    university_lab_address_line_1 == null ||
    university_lab_address_state == null ||
    university_lab_address_city == null ||
    university_lab_address_zip == null
  ) {
    toast.error('Please fill out all fields')
    return undefined
  }

  const university_lab_address: Address = {
    id: uuidv4(),
    line_1: university_lab_address_line_1,
    line_2: null,
    state_code: university_lab_address_state,
    country_code: 'USA',
    city: university_lab_address_city,
    postal_code: university_lab_address_zip,
  }

  const uniData: UniversityUser = {
    university_department: university_department,
    university_name: university_name,
    id: id,
    primary_investigator: primary_investigator,
  }

  return {
    ...uniData,
    address: university_lab_address,
  }
}

/**
 * Scrape data from the Material UI form for regulator signup.
 *
 * @param data data from form
 * @returns required information to onboard a regulator user, or undefined if some data is missing
 */
export function getRegulatorSignupInfoFromForm(data: FormData):
  | (RegulatorUser & {
      address: Address
    })
  | undefined {
  const id = ''
  const regulator_name = data.get('regulator_name')?.toString() || null
  let contact_phone = data.get('regulator_contact_phone')?.toString() || null
  const mailing_address_line_1 =
    data.get('mailing_address_line_1')?.toString() || null
  const mailing_address_state =
    data.get('mailing_address_state')?.toString() || 'NY'
  const mailing_address_city =
    data.get('mailing_address_city')?.toString() || null
  const mailing_address_zip =
    data.get('mailing_address_zip')?.toString() || null

  if (
    regulator_name == null ||
    contact_phone == null ||
    mailing_address_line_1 == null ||
    mailing_address_state == null ||
    mailing_address_city == null ||
    mailing_address_zip == null
  ) {
    toast.error('Please fill out all fields')
    return undefined
  }

  try {
    contact_phone = toE164(contact_phone)
  } catch (error) {
    toast.error('Please enter a valid phone number')
    return undefined
  }

  const mailing_address: Address = {
    id: uuidv4(),
    line_1: mailing_address_line_1,
    line_2: null,
    state_code: mailing_address_state,
    country_code: 'USA',
    city: mailing_address_city,
    postal_code: mailing_address_zip,
  }

  const govData: RegulatorUser = {
    mailing_address_id: mailing_address.id,
    regulator_name: regulator_name,
    contact_phone: contact_phone,
    id: id,
  }

  return {
    ...govData,
    address: mailing_address,
  }
}

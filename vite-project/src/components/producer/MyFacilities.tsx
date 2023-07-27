import insertAndShowFacilities from '@/hooks/addFacility'
import useFacilitiesDetails from '@/hooks/useFacilities'
import { Facility } from '@/types/supabaseAlias'
import { useUser } from '@supabase/auth-helpers-react'
import { FormEvent } from 'react'
import GeneralForm from '../GeneralForm'
import { facilityInputs } from '../UserTypes'

export default function Facilities() {
  const user = useUser()
  const facilities = useFacilitiesDetails(user)
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const facilityName = formData.get('facility_name')?.toString()
    const address = formData.get('address')?.toString()
    const description = formData.get('description')?.toString() || null
    const id = ''
    const userId = user?.id

    if (!facilityName || !address || !userId) {
      throw new Error('please provide a valid brand name and be a valid user')
    }
    const newBrand: Facility = {
      name: facilityName,
      id: '',
      producer_id: userId,
      description: description,
      location: address,
    }
    return newBrand
  }
  const insertFacility = (newFacility: Facility, oldFacilities: Facility[]) => {
    insertAndShowFacilities({
      oldFacilities: oldFacilities,
      newFacility: newFacility,
      user: user,
    })
  }

  if (facilities.data) {
    return (
      <div>
        {facilities.data.map((facility) => (
          <p key={facility.name}>{facility.name}</p>
        ))}
        <GeneralForm<Facility>
          inputs={facilityInputs}
          oldT={facilities.data}
          createT={handleSubmit}
          insertT={insertFacility}
        ></GeneralForm>
      </div>
    )
  } else if (facilities.isLoading) {
    return <p>Loading...</p>
  }

  return <p>Something went wrong</p>
}

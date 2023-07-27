import insertAndShowBrands from '@/hooks/addBrand'
import useBrandsDetails from '@/hooks/useBrands'
import { Brand } from '@/types/supabaseAlias'
import { useUser } from '@supabase/auth-helpers-react'
import { FormEvent } from 'react'
import GeneralForm from '../GeneralForm'
import { brandInputs } from '../UserTypes'

export default function Brands() {
  const user = useUser()
  const brands = useBrandsDetails(user)
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const brandName = formData.get('brand_name')?.toString()
    const servingSize = formData.get('serving_size')?.toString()
    const imgPath = formData.get('img_path')?.toString() || null
    const id = ''
    const userId = user?.id

    if (!brandName || !userId || !servingSize) {
      throw new Error('please provide a valid brand name and be a valid user')
    }
    // @ts-ignore
    const newBrand: Brand = {
      name: brandName,
      id: '',
      producer_user_id: userId,
      serving_size: parseFloat(servingSize),
      image_path: imgPath,
    }
    return newBrand
  }
  const insertBrand = (newBrand: Brand, oldBrands: Brand[]) => {
    insertAndShowBrands({
      oldBrands: oldBrands,
      newBrand: newBrand,
      user: user,
    })
  }

  if (brands.data) {
    return (
      <div>
        {brands.data.map((brand) => (
          <p key={brand.name}>{brand.name}</p>
        ))}
        <GeneralForm<Brand>
          inputs={brandInputs}
          oldT={brands.data}
          createT={handleSubmit}
          insertT={insertBrand}
        ></GeneralForm>
      </div>
    )
  } else if (brands.isLoading) {
    return <p>Loading...</p>
  }

  return <p>Something went wrong</p>
}

interface Props {
  setSelectedStrainName: (strainName: string) => void
}

export default function SelectStrainName({ setSelectedStrainName }: Props) {
  return (
    <div className="mt-2">
      <input
        type="text"
        name="strainName"
        autoComplete="off"
        className="block w-full rounded-md border py-1.5 text-gray-900 border-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        placeholder="Gorilla Glue OG"
        onChange={(e) => setSelectedStrainName(e.target.value)}
      />
    </div>
  )
}

import './assets/css/Upload.css'
import { SetStateAction, useState } from 'react'

function Upload() {
  const [selectedButton, setSelectedButton] = useState('View All')
  const [searchTerm, setSearchTerm] = useState('')

  const navLinks = [
    { label: 'View All', key: 'View All', link: '#' },
    { label: 'Your Files', key: 'Your Files', link: '#' },
    { label: 'Shared Files', key: 'Shared Files', link: '#' },
  ]

  const handleButtonClick = (buttonName: SetStateAction<string>) => {
    setSelectedButton(buttonName)
  }

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  // Define the table data as a constant array
  const tableData = [
    {
      uploadedBy: 'HerbalHealth',
      lastUploaded: '2023-07-21',
      solvents: 'Water, 10ML',
      percentage: '95.2%',
      tool: 'HPLC',
      sample: 'Cannabinoid',
      sku: 'SKU287417',
      name: 'product_123_report.pdf',
    },
    {
      uploadedBy: 'HerbalHealth',
      lastUploaded: '2023-07-21',
      solvents: 'Water, 10ML',
      percentage: '95.2%',
      tool: 'HPLC',
      sample: 'Cannabinoid',
      sku: 'SKU287417',
      name: 'product_123_report.pdf',
    },
    {
      uploadedBy: 'HerbalHealth1',
      lastUploaded: '2023-07-21',
      solvents: 'Water, 10ML',
      percentage: '95.2%',
      tool: 'HPLC',
      sample: 'Test',
      sku: 'SKU287417',
      name: 'product_123_report.pdf',
    },
  ]

  const renderDesktopLinks = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.link}
                onClick={() => handleButtonClick(link.label)}
                className={`${
                  selectedButton === link.label
                    ? 'text-green-600 font-semibold text-xl'
                    : 'text-xl'
                } hover:text-[#457F6C] px-1 py-3 rounded-md text-sm font-medium`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 border rounded-md text-sm bg-search text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <div className="container p-5 bg-white">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border border-opacity-50 border-stroke border-dashed rounded-lg cursor-pointer bg-black-50 dark:hover:bg-bray-800  hover:bg-black-100  dark:hover:border-black-500"
          >
            {/* File drop section */}
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-12 h-12 mb-4 text-black-500 dark:text-black-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="#457F6C"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-black-500 dark:text-black-400">
                <span className="font-semibold text-3xl text-[#457F6C]">
                  Click to upload or drag and drop
                </span>
              </p>
              <p className="text-xs text-black-500 dark:text-black-400">
                MZXML, XML, CSV (MAX. 1GB)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

        <div className="header pt-3">{renderDesktopLinks()}</div>

        {/* Table section */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black-500 dark:text-black-400">
            <thead className=" bg-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3 font-light">
                  Uploaded By
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Last Uploaded
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Solvents
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  %
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Tool
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  Sample Type
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 font-light">
                  File Name
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .filter((entry) =>
                  Object.values(entry).some((value) =>
                    value
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  ),
                )
                .map((entry, index) => (
                  <tr key={index}>
                    <th className="px-6 font-medium text-black-900 whitespace-nowrap">
                      {entry.uploadedBy}
                    </th>
                    <td className="px-6 py-3 text-black-900">
                      {entry.lastUploaded}
                    </td>
                    <td className="px-6 py-3 text-black-900">
                      {entry.solvents}
                    </td>
                    <td className="px-6 py-3 text-black-900">
                      {entry.percentage}
                    </td>
                    <td className="px-6 py-3 text-black-900">{entry.tool}</td>
                    <td className="px-6 py-3 text-black-900">{entry.sample}</td>
                    <td className="px-6 py-3 text-black-900">{entry.sku}</td>
                    <td className="px-6 py-3 text-black-900">{entry.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Upload

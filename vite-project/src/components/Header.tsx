import { HeaderIcon, HeaderLink } from '@/types/dashboard'
import React, { useState } from 'react'
import './assets/css/header.css'

interface Props {
  dashboardTitle: string
  headerIcons: HeaderIcon[]
  headerLinks: HeaderLink[]
}

export default function Nav({
  dashboardTitle,
  headerIcons,
  headerLinks,
}: Props) {
  const [selectedButton, setSelectedButton] = useState(headerLinks[0].label)
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearchValue(event.target.value)
  }

  return (
    <nav className="bg-background container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {headerIcons.slice(3, 5).map((headerIcon, index) => (
              <img
                key={index}
                className="w-7 h-7 cursor-pointer"
                src={headerIcon.icon}
                alt={`Icon ${index}`}
                onClick={() => headerIcon.onClick()}
              />
            ))}
            <div className="text-gray-400">{dashboardTitle}</div>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              className="px-2 py-1 border rounded-md text-sm bg-search text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {headerIcons.slice(0, 3).map((headerIcon, index) => (
              <img
                key={index}
                className="w-7 h-7 cursor-pointer"
                src={headerIcon.icon}
                alt={`Icon ${index}`}
                onClick={() => headerIcon.onClick()}
              />
            ))}
          </div>
        </div>
      </div>
      <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <div className="hidden sm:block">
              <div className="color flex items-baseline space-x-4">
                {headerLinks.map((link) => (
                  <div
                    key={link.label}
                    onClick={() => {
                      setSelectedButton(link.label)
                      link.onClick()
                    }}
                    className={`cursor-pointer px-1 py-2 rounded-md text-sm font-medium ${
                      selectedButton === link.label
                        ? 'selected-link font-semibold'
                        : 'font-normal'
                    }`}
                  >
                    {link.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

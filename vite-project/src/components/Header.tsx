import React, { useState } from 'react'
import './assets/css/header.css'
import Sun from './assets/svg/Sun.svg'
import Clock from './assets/svg/Clock.svg'
import Bell from './assets/svg/Bell.svg'
import Sidebar from './assets/svg/Sidebar.svg'
import Star from './assets/svg/Star.svg'

const navIcons = [
  { icon: Sun, link: '#' },
  { icon: Clock, link: '#' },
  { icon: Bell, link: '#' },
  { icon: Sidebar, link: '#' },
  { icon: Star, link: '#' },
]

const navLinks = [
  { label: 'Overview', key: 'Overview', link: '#' },
  { label: 'Upload', key: 'Upload', link: '#' },
  { label: 'QR Code', key: 'QR Code', link: '#' },
  { label: 'Calendar', key: 'Calander', link: '#' },
  { label: 'Track Shipments', key: 'Track Shipments', link: '#' },
  { label: 'Settings', key: 'Settings', link: '#' },
]

const Nav = () => {
  const [selectedButton, setSelectedButton] = useState('Overview')
  const [searchValue, setSearchValue] = useState('')

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName)
  }

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearchValue(event.target.value)
  }

  const renderDesktopLinks = () => {
    return navLinks.map((link) => (
      <a
        key={link.key}
        href={link.link}
        onClick={() => handleButtonClick(link.label)}
        className={`${
          selectedButton === link.label ? 'selected-link font-semibold' : ''
        } px-1 py-2 rounded-md text-sm font-medium`}
      >
        {link.label}
      </a>
    ))
  }

  return (
    <div>
      <nav className="bg-background container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {navIcons.slice(3, 5).map((navIcon, index) => (
                <a href={navIcon.link} key={index}>
                  <img
                    className="w-7 h-7"
                    src={navIcon.icon}
                    alt={`Icon ${index}`}
                  />
                </a>
              ))}
              <div className="text-gray-400">Lab Dashboard</div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                className="px-2 py-1 border rounded-md text-sm bg-search text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {navIcons.slice(0, 4).map((navIcon, index) => (
                <a href={navIcon.link} key={index}>
                  <img
                    className="w-7 h-7"
                    src={navIcon.icon}
                    alt={`Icon ${index}`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <div className="hidden md:block">
                <div className="color flex items-baseline space-x-4">
                  {renderDesktopLinks()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <br></br>
          <h1>Hey there.</h1>
        </div>
      </main>
    </div>
  )
}

export default Nav

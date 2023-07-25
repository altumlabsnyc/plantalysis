import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import "./assets/css/header.css";

const StarIcon = () => (
  <svg
    className="h-6 w-6 text-gray-400 hover:text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 2L9 11l-7 4 3 7 9-5 9 5 3-7-7-4-3-9z"
    />
  </svg>
);


const SunIcon = () => (
  <svg
    className="h-6 w-6 text-gray-400 hover:text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 12a7 7 0 11-14 0 7 7 0 0114 0zM12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    className="h-6 w-6 text-gray-400 hover:text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 2C11.3431 2 10 3.34315 10 5V12H6C4.34315 12 3 13.3431 3 15V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V15C21 13.3431 19.6569 12 18 12H14V5C14 3.34315 12.6569 2 11 2Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="h-6 w-6 text-gray-400 hover:text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Overview"); // Track the selected button
  const [searchValue, setSearchValue] = useState(""); // State for the search bar value

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <nav className="bg-background container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and text container */}
            <div className="flex items-center space-x-4">
              <MenuIcon />
              <StarIcon />
              <div className = "text-gray-400">
                Lab Dashboard
              </div>
            </div>
            <div className="flex items-center space-x-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                className="px-2 py-1 border rounded-md text-sm bg-search text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <SunIcon />
              <BellIcon />
              <MenuIcon />
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex">
              <div className="hidden md:block">
                <div className="color flex items-baseline space-x-4">
                <a
                  href="#"
                  onClick={() => handleButtonClick("Overview")}
                  className={`${
                    selectedButton === "Overview"
                      ? "selected-link font-semibold" // Add the "selected-link" class for the selected link
                      : ""
                  } px-1 py-2 rounded-md text-sm font-medium`}
                >
                  Overview
                </a>

                  <a
                    href="#"
                    onClick={() => handleButtonClick("Upload")}
                    className={`${
                      selectedButton === "Upload"
                        ? "selected-link font-semibold" // Add the "selected-link" class for the selected link
                        : ""
                    } px-1 py-2 rounded-md text-sm font-medium`}
                  >
                    Upload
                  </a>

                  <a
                    href="#"
                    onClick={() => handleButtonClick("QR Code")}
                    className={`${
                      selectedButton === "QR Code"
                        ? "selected-link font-semibold"
                        : ""
                    } px-1 py-2 rounded-md text-sm font-medium`}
                  >
                    QR Code
                  </a>

                  <a
                    href="#"
                    onClick={() => handleButtonClick("Calander")}
                    className={`${
                      selectedButton === "Calander"
                        ? "selected-link font-semibold" 
                        : ""
                    } px-1 py-2 rounded-md text-sm font-medium`}
                  >
                    Calander
                  </a>

                  <a
                    href="#"
                    onClick={() => handleButtonClick("Track Shipments")}
                    className={`${
                      selectedButton === "Track Shipments"
                        ? "selected-link font-semibold"
                        : ""
                    } px-1 py-2 rounded-md text-sm font-medium`}
                  >
                    Track Shipments
                  </a>

                  <a
                    href="#"
                    onClick={() => handleButtonClick("Settings")}
                    className={`${
                      selectedButton === "Settings"
                        ? "selected-link font-semibold"
                        : ""
                    } px-1 py-2 rounded-md text-sm font-medium`}
                  >
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Display */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-1">
                <a
                  href="#"
                  onClick={() => handleButtonClick("Overview")}
                  className={`${
                    selectedButton === "Overview"
                      ? "font-bold underline  text-white"
                      : " text-gray-300"
                  } block px-1 py-2 rounded-md text-base font-medium`}
                >
                  Overview
                </a>

                <a
                  href="#"
                  onClick={() => handleButtonClick("Upload")}
                  className={`${
                    selectedButton === "Upload"
                      ? "font-bold underline  text-white"
                      : " text-gray-300"
                  } block px-1 py-2 rounded-md text-base font-medium`}
                >
                  Upload
                </a>

                <a
                  href="#"
                  onClick={() => handleButtonClick("Projects")}
                  className={`${
                    selectedButton === "Projects"
                      ? "font-bold underline  text-white"
                      : " text-gray-300"
                  } block px-1 py-2 rounded-md text-base font-medium`}
                >
                  Projects
                </a>

                <a
                  href="#"
                  onClick={() => handleButtonClick("Calendar")}
                  className={`${
                    selectedButton === "Calendar"
                      ? "font-bold underline  text-white"
                      : " text-gray-300"
                  } block px-1 py-2 rounded-md text-base font-medium`}
                >
                  Calendar
                </a>

                <a
                  href="#"
                  onClick={() => handleButtonClick("Reports")}
                  className={`${
                    selectedButton === "Reports"
                      ? "font-bold underline  text-white"
                      : " text-gray-300"
                  } block px-1 py-2 rounded-md text-base font-medium`}
                >
                  Reports
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>

      <main></main>
    </div>
  );
}

export default Nav;

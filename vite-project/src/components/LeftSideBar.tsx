import blank from '@/components/assets/img/blank.png'
import newLogo from '@/components/assets/img/newPlantalysis.png'
import { SidebarSection } from '@/types/dashboard'
import { Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

interface LeftSideBarProps {
  sidebarOpen: boolean
  title: string
  subtitle: string
  sections: SidebarSection[]
}

// interface SidebarSection {
//   title: string
//   pages: DashboardPanel[]
//   collapsed: boolean
//   isMainSection: boolean // new property to differentiate between main and subpage sections
// }

// used to keep track of state
type SectionEnhanced = SidebarSection & {
  collapsed: boolean
}

export default function LeftSideBar({
  sidebarOpen,
  title,
  subtitle,
  sections,
}: LeftSideBarProps) {
  const history = useHistory()

  const [sectionsEnhanced, setSectionsEnhanced] = useState<SectionEnhanced[]>(
    sections.map((section) => ({ ...section, collapsed: true })),
  )

  // [
  //   {
  //     title: 'User Profile',
  //     pages: [
  //       { link: '/user-profile/overview', text: 'Overview' },
  //       { link: '/user-profile/user-guide', text: 'User Guide' },
  //       { link: '/user-profile/customer-support', text: 'Customer Support' },
  //       { link: '/user-profile/contacts', text: 'Contacts' },
  //       { link: '/user-profile/order-management', text: 'Order Management' },
  //       { link: '/user-profile/data-privacy', text: 'Data Privacy' },
  //     ],
  //     collapsed: true,
  //     isMainSection: true,
  //   },
  //   {
  //     title: 'Altum Corporate',
  //     pages: [
  //       // { link: '/altum-corporate/page-1', text: 'Altum Corporate Page 1' },
  //       // { link: '/altum-corporate/page-2', text: 'Altum Corporate Page 2' },
  //       // { link: '/altum-corporate/page-3', text: 'Altum Corporate Page 3' },
  //     ],
  //     collapsed: true,
  //     isMainSection: true,
  //   },
  //   {
  //     title: 'Blog',
  //     pages: [
  //       // { link: '/blog/page-1', text: 'Blog Page 1' },
  //       // { link: '/blog/page-2', text: 'Blog Page 2' },
  //       // { link: '/blog/page-3', text: 'Blog Page 3' },
  //     ],
  //     collapsed: true,
  //     isMainSection: true,
  //   },
  // ]

  const toggleSection = (index: number) => {
    setSectionsEnhanced((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, collapsed: !section.collapsed } : section,
      ),
    )
  }

  const sidebarClasses = classNames(
    'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col',
    {
      block: sidebarOpen,
      hidden: !sidebarOpen,
    },
  )

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <div className={sidebarClasses}>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white-200 px-9 bg-background">
            {' '}
            {/* Add "bg-white" class for white background */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                className="h-24 w-24 object-cover cursor-pointer"
                src={newLogo}
                alt="Your Company"
                onClick={() => history.push('/')}
              />
              <span
                style={{
                  marginLeft: '-36px',
                  marginTop: '30px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                lantalysis
              </span>
              <span
                style={{
                  marginLeft: '-36px',
                  marginTop: '75px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                by Altum Labs
              </span>
            </div>
            <div className="flex h-16 shrink-0 items-center gap-4">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={blank}
                  alt="Your Company"
                />
              </div>
              <div className="flex flex-col">
                <span
                  style={{ color: '#457F6C' }} // Add inline style to set the grey color
                  className="text-lg font-medium" // Change text-lg to make the text larger
                >
                  {title}
                </span>
                <span
                  style={{ color: '#457F6C' }} // Add inline style to set the grey color
                  className="text-sm" // Change text-sm to make the text smaller
                >
                  {subtitle}
                </span>
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <h2 className="text-sm text-gray-500 px-2 py-1">Pages</h2>
              <ul role="list" className="flex flex-1 flex-col gap-y-3">
                {sectionsEnhanced.map((section, index) => (
                  <li key={section.title}>
                    <button
                      onClick={() => toggleSection(index)}
                      className="bg-white-50 text-grey-600 group flex items-center gap-x-1 rounded-md p-1 text-sm leading-6 font-semibold w-full items-center" // add items-center class to center the content vertically
                    >
                      {section.items.length !== 0 && ( // Only show arrow for main sections
                        <ChevronRightIcon
                          // style={{ color: '#a0aec0' }}
                          className={classNames(
                            'text-grey-600 transform transition-transform w-4 h-4',
                            {
                              'rotate-90': !section.collapsed,
                            },
                          )}
                          aria-hidden="true"
                        />
                      )}
                      {section.title}
                    </button>
                    {!section.collapsed && (
                      <ul role="list" className="-mx-2 space-y-1 ml-4 mt-0">
                        {section.items.map((option) => (
                          <li className="ml-2" key={option.text}>
                            <p
                              onClick={() => option.onClick()}
                              className="cursor-pointer bg-white-50 text-grey-600 group flex gap-x-3 rounded-md p-0.5 m-0 text-sm leading-6 font-semibold w-full hover:text-green-700" // Adjusted padding and margin values here
                            >
                              {option.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  )
}

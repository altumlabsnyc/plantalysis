import logo from '@/components/assets/img/logo.png'
import { ChairAlt } from '@mui/icons-material'
import classNames from 'classnames'

import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { DashboardPanel } from './Dashboard'

interface LeftSideBarProps {
  panels: DashboardPanel[]
  sidebarOpen: boolean
}

export default function LeftSideBar({ panels, sidebarOpen }: LeftSideBarProps) {
  //   let menuOptions: DashboardPanel[];
  //   switch (pabe) {
  //     case "lab":
  //       menuOptions = labUserLeftSideBar;
  //       break;
  //     case "producer":
  //       menuOptions = producerUserLeftSideBar;
  //       break;
  //     default:
  //       menuOptions = [];
  //       break;
  //   }

  // if (!sidebarOpen) {
  //   return null
  // }

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
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 bg-pink-300">
            <p>dynamic left sidebar here</p>
            <div className="flex h-16 shrink-0 items-center gap-4">
              <img
                className="h-8 w-auto bg-red-400"
                src={logo}
                alt="Your Company"
              />
              Altum Labs
            </div>
            <nav className="flex flex-1 flex-col ">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        <li>
                          {panels.map((option: DashboardPanel) => (
                            <a
                              href={option.link}
                              className={classNames(
                                'bg-gray-50 text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                              )}
                              key={option.link}
                            >
                              <ChairAlt
                                className={classNames(
                                  'text-indigo-600',
                                  'h-6 w-6 shrink-0',
                                )}
                                aria-hidden="true"
                              />
                              {option.text}
                            </a>
                          ))}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  )
}

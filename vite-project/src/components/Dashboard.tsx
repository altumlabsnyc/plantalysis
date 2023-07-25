import React from "react";

import logo from "@/components/assets/img/logo.png";
import { Dialog, Transition } from "@headlessui/react";
import { ChairAlt } from "@mui/icons-material";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { UserType } from "./UserTypes";

import LeftSideBar from "./LeftSideBar";

export type DashboardPanel = {
  link: string;
  icon: React.ReactNode;
  text: string;
};

interface DashboardProps {
  children: React.ReactNode;
  role: UserType;
  panels: DashboardPanel[];
}

export default function Dashboard({ children, role, panels }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        {/* Mobile menu & transition CAN IGNORE FOR NOW */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <ChairAlt
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Mobile / Small Screen Sidebar components */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 bg-emerald-300">
                    <p>dynamic mobile sidebar</p>
                    <div className="flex h-16 shrink-0 items-center gap-4">
                      <img
                        className="h-8 w-auto bg-red-400"
                        src={logo}
                        alt="Your Company"
                      />
                      <p>Altum Labs</p>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            <li>
                              <a
                                className={classNames(
                                  "bg-gray-50 text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <ChairAlt
                                  className={classNames(
                                    "text-indigo-600",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                sidebar item
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, put the dynamic sidebar here */}
          <LeftSideBar panels={panels}></LeftSideBar>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden bg-yellow-300">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <ChairAlt className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            dynamic Mobile header (work on later)
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
          </a>
        </div>

        <main className="lg:pl-72">
          <div className="bg-green-300 w-full">
            {/* Main area */}
            <div className="w-full bg-orange-200 h-12">dynamic header here</div>
            {children}
          </div>
        </main>

        <aside className="fixed inset-y-0 right-0 bg-red-200 hidden w-72 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          {/* Secondary column (hidden on smaller screens) */}
          <p>dynamic right sidebar here</p>
        </aside>
      </div>
    </>
  );
}

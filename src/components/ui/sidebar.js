"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { useSearchStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState as useHookState } from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import { BentoGridSkeleton } from "@/components/ui/skeletons";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment } from "react";

import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon,
  UserGroupIcon,
  BanknotesIcon,
  HomeModernIcon,
  TruckIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  { 
    name: "People & Society", 
    href: "/people-society", 
    icon: UserGroupIcon, 
    current: false,
    description: "Population and Demographics, Migration and Geographic Mobility, Education and School Data"
  },
  { 
    name: "Economy & Workforce", 
    href: "/economy-workforce", 
    icon: BanknotesIcon, 
    current: false,
    description: "Income and Earnings, Labor Force and Employment, Business and Economic Data, Consumer Spending and Poverty"
  },
  { 
    name: "Housing & Real Estate", 
    href: "/housing-real-estate", 
    icon: HomeModernIcon, 
    current: false,
    description: "Housing and Real Estate"
  },
  { 
    name: "Infrastructure & Transportation", 
    href: "/infrastructure-transportation", 
    icon: TruckIcon, 
    current: false,
    description: "Transportation and Infrastructure"
  },
  { 
    name: "Health & Well-being", 
    href: "/health-wellbeing", 
    icon: HeartIcon, 
    current: false,
    description: "Healthcare and Public Health"
  },
  {
    name: "AI Assisted Results",
    href: "/ai",
    icon: SparklesIcon,
    current: false,
    description: "AI Assisted Results for Advanced Data Analysis"
  },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery, currentSearch, aiSearchQuery, aiCurrentSearch, setSearchQuery, setCurrentSearch, showAiButton } = useSearchStore();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleNavigation = (href, e) => {
    e.preventDefault();
    setSidebarOpen(false);
    router.replace(href);
  };

  return (
    <div className="h-full">
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        as="div"
        className="relative z-50 lg:hidden" 
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
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
            {/* Sidebar component for mobile */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=400"
                  className="h-8 w-auto dark:brightness-125"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.filter(item => item.name !== "AI Assisted Results" || showAiButton).map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            onClick={(e) => handleNavigation(item.href, e)}
                            className={classNames(
                              pathname === item.href
                                ? "text-indigo-600 dark:text-indigo-300"
                                : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300",
                              "group flex gap-x-3 p-2 text-sm font-semibold relative"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                pathname === item.href
                                  ? "text-indigo-600 dark:text-indigo-300"
                                  : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300",
                                "h-6 w-6 shrink-0"
                              )}
                            />
                            {item.name}
                            {item.description && (
                              <div className="absolute left-full ml-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                {item.description}
                              </div>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <button
                      onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark");
                        setSidebarOpen(false);
                      }}
                      className="group -mx-2 flex w-full gap-x-3 p-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300"
                    >
                      <span className="h-6 w-6 shrink-0">
                        {theme === "dark" ? (
                          <SunIcon className="h-6 w-6 text-gray-400 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" />
                        ) : (
                          <MoonIcon className="h-6 w-6 text-gray-400 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" />
                        )}
                      </span>
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </button>
                    <a
                      href="#"
                      onClick={() => setSidebarOpen(false)}
                      className="group -mx-2 flex gap-x-3 p-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300"
                    >
                      <span className="h-6 w-6 shrink-0">
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-400 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
                        />
                      </span>
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className={classNames(
        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 bg-white dark:bg-gray-900",
        isCollapsed ? "lg:w-20 group hover:lg:w-72" : "lg:w-72"
      )}>
        {/* Sidebar component for desktop */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=400"
              className={classNames("h-8 w-auto transition-all dark:brightness-125", isCollapsed ? "mx-auto" : "")}
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.filter(item => item.name !== "AI Assisted Results" || showAiButton).map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavigation(item.href, e)}
                        className={classNames(
                          pathname === item.href
                            ? "text-indigo-600 dark:text-indigo-300 hover:bg-transparent"
                            : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300",
                          "group flex gap-x-3 p-2 text-sm font-semibold relative"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            pathname === item.href
                              ? "text-indigo-600 dark:text-indigo-300"
                              : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300",
                            "h-6 w-6 shrink-0"
                          )}
                        />
                        <span className={classNames(
                          "transition-opacity duration-300",
                          isCollapsed ? "opacity-0 group-hover:opacity-100 whitespace-nowrap" : "opacity-100"
                        )}>
                          {item.name}
                        </span>
                        {item.description && (
                          <div className="absolute left-full ml-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                            {item.description}
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={classNames(
                    "group -mx-2 flex gap-x-3 p-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300",
                    isCollapsed ? "justify-center" : "w-full"
                  )}
                >
                  <span className="h-6 w-6 shrink-0">
                    {theme === "dark" ? (
                      <SunIcon className="h-6 w-6 text-gray-400 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" />
                    ) : (
                      <MoonIcon className="h-6 w-6 text-gray-400 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" />
                    )}
                  </span>
                  <span className={classNames(
                    "transition-opacity duration-300",
                    isCollapsed ? "opacity-0 group-hover:opacity-100 whitespace-nowrap" : "opacity-100"
                  )}>
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 p-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  <span className="h-6 w-6 shrink-0">
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-400 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
                    />
                  </span>
                  <span className={classNames(
                    "transition-opacity duration-300",
                    isCollapsed ? "opacity-0 group-hover:opacity-100 whitespace-nowrap" : "opacity-100"
                  )}>
                    Settings
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Content area to the right of the sidebar */}
      <div className={classNames(
        "transition-all duration-300 min-h-screen relative",
        isCollapsed ? "lg:pl-20" : "lg:pl-72"
      )}>
        {/* Background dot pattern */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900">
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="[mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)] opacity-50"
          />
        </div>

        {/* Top navbar */}
        <div className="z-40 backdrop-blur-sm lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Search bar */}
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form 
                className={pathname === '/ai' ? 'hidden' : ''}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const search = formData.get('search');
                  if (search) {
                    setIsLoading(true);
                    setSearchQuery(search);
                    setCurrentSearch(search);
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 1500);
                  }
                }}
                className="relative flex w-full items-center"
              >
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500 ${pathname === '/' || pathname === '/ai' ? 'opacity-0' : ''}`}
                />
                <input
                  name="search"
                  type="search"
                  disabled={isLoading}
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                  className={cn(
                    "block h-10 w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 dark:text-gray-100 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed",
                    (pathname === '/' || pathname === '/ai') && 'opacity-0 pointer-events-none'
                  )}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {currentSearch && !isLoading && pathname !== '/' && pathname !== '/ai' && (
                  <div className="absolute -bottom-8 left-10 text-sm text-gray-600 dark:text-gray-400">
                    Showing results for <AuroraText>{currentSearch}</AuroraText>
                  </div>
                )}
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-800"
                    />
                    <span className="ml-4 hidden text-sm font-semibold text-gray-900 dark:text-gray-100 lg:block">
                      Tom Cook
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 text-gray-400 dark:text-gray-500"
                    />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-700/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm" : "",
                                "block px-3 py-1 text-sm text-gray-900 dark:text-gray-100"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 relative">
            {isLoading ? (
              <BentoGridSkeleton />
            ) : null}
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

import { Footer } from "@/components/ui/footer";
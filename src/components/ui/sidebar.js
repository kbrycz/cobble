"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { useSearchStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";
import { BentoGridSkeleton } from "@/components/ui/skeletons";
import { Dialog } from "@headlessui/react";
import { Footer } from "@/components/ui/footer";
import { DotPattern } from "@/components/ui/dot-pattern";
import { HelpDialog } from "@/components/ui/help-dialog";

import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery, currentSearch, aiSearchQuery, aiCurrentSearch, setSearchQuery, setCurrentSearch, showAiButton, isAuthenticated, setIsAuthenticated } = useSearchStore();
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
        className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" />

        <div className="fixed inset-0 flex">
          <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
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
                      {navigation.filter(item => {
                        if (item.name === "AI Assisted Results" && !showAiButton) return false;
                        return true;
                      }).map((item) => (
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
                      href="/settings"
                      onClick={(e) => handleNavigation("/settings", e)}
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
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className={classNames(
        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col bg-white dark:bg-gray-900",
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
                  {navigation.filter(item => {
                    if (item.name === "AI Assisted Results" && !showAiButton) return false;
                    return true;
                  }).map((item) => (
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
                <a
                  href="/settings"
                  onClick={(e) => handleNavigation("/settings", e)}
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

      {/* Content area */}
      <div className={classNames(
        "min-h-screen relative",
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
                className={cn(
                  "relative flex w-full items-center",
                  pathname === '/' || pathname === '/ai' || pathname === '/pricing' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                )}
              >
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500`}
                />
                <input
                  name="search"
                  type="search"
                  disabled={isLoading}
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                  className="block h-10 w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 dark:text-gray-100 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </form>
              <div className="flex items-center gap-x-2 sm:gap-x-4">
                <a
                  href={pathname === "/pricing" ? "/" : "/pricing"}
                  onClick={(e) => handleNavigation(pathname === "/pricing" ? "/" : "/pricing", e)}
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300 whitespace-nowrap"
                >
                  {pathname === "/pricing" ? "Home" : "Pricing"}
                </a>
                {!isAuthenticated ? (
                  <>
                    {/* Sign In Button */}
                    <button
                      onClick={() => setIsAuthenticated(true)}
                      className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300 whitespace-nowrap"
                    >
                      Sign In
                    </button>

                    {/* Sign Up Button */}
                    <button
                      onClick={() => setIsAuthenticated(true)}
                      className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  /* Sign Out Button */
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                )}

                {/* Theme Toggle */}
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-2 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">Toggle theme</span>
                  {theme === "dark" ? (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>

                {/* Help Button */}
                <button
                  type="button"
                  onClick={() => setIsHelpOpen(true)}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">View help</span>
                  <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 relative">
            {isLoading ? (
              <BentoGridSkeleton />
            ) : null}
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
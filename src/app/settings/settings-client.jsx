"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Account", id: "account" },
  { name: "Application", id: "application" },
  { name: "Subscription", id: "subscription" }
];

export default function SettingsClient() {
  const [currentTab, setCurrentTab] = useState("account");

  return (
    <main>
      <div className="mx-auto max-w-[95%] sm:max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={cn(
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                    currentTab === tab.id
                      ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Account Settings */}
          {currentTab === "account" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your personal information and email preferences.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-900 dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 border-t border-gray-200 dark:border-gray-800 pt-10">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your password to keep your account secure.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Current password
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-900 dark:text-white">
                        New password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                      Update password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Application Settings */}
          {currentTab === "application" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Preferences</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Customize your application experience.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="notifications"
                        name="notifications"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-600 dark:focus:ring-indigo-400"
                      />
                      <label htmlFor="notifications" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Enable email notifications
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                      Save preferences
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Subscription Settings */}
          {currentTab === "subscription" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Current Plan</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage your subscription and billing information.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="rounded-lg bg-white/5 p-6 ring-1 ring-gray-300 dark:ring-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Free Plan</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      You are currently on the free plan. Upgrade to access premium features.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                      >
                        Upgrade plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
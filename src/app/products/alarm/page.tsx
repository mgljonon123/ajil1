"use client";

import { useState } from "react";

export default function AlarmProductPage() {
  const [mainTab, setMainTab] = useState("home");
  const [subTab, setSubTab] = useState(0);

  const homeOptions = ["Home Option 1", "Home Option 2", "Home Option 3"];
  const workOptions = ["Work Option 1", "Work Option 2", "Work Option 3"];
  const subOptions = mainTab === "home" ? homeOptions : workOptions;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Alarm Chip</h1>
      <p className="text-lg text-gray-700 mb-8">
        Detailed information about our Alarm Chip will appear here.
      </p>

      {/* Main Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${
            mainTab === "home"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => {
            setMainTab("home");
            setSubTab(0);
          }}
        >
          Home
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${
            mainTab === "work"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => {
            setMainTab("work");
            setSubTab(0);
          }}
        >
          Work
        </button>
      </div>

      {/* Sub Options */}
      <div className="flex space-x-4 mb-8">
        {subOptions.map((option, idx) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-md border font-medium transition-colors ${
              subTab === idx
                ? "bg-blue-100 border-blue-600 text-blue-800"
                : "bg-gray-100 border-gray-300 text-gray-700"
            }`}
            onClick={() => setSubTab(idx)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Content for selected sub-option */}
      <div className="w-full max-w-xl bg-gray-50 rounded-lg p-6 shadow text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">
          {subOptions[subTab]}
        </h2>
        <p className="text-gray-700">
          Information about <b>{subOptions[subTab]}</b> for the Alarm Chip will
          be shown here.
        </p>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "react-feather";

const Select = ({ options, placeholder, onChange, value }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full md:w-[180px] p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="All">{placeholder}</option>
    {options.map((option) =>
      typeof option === "string" ? (
        <option key={option} value={option}>
          {option}
        </option>
      ) : (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      )
    )}
  </select>
);

export const Filters = ({
  levels,
  trimesters,
  materials,
  units,
  difficulties,
  onFilterChange,
  selectedFilters,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-wrap justify-between items-center gap-4">
        <Select
          options={levels}
          placeholder="Select Level"
          onChange={(value) => onFilterChange("level", value)}
          value={selectedFilters.level}
        />
        <Select
          options={trimesters}
          placeholder="Select Trimester"
          onChange={(value) => onFilterChange("trimester", value)}
          value={selectedFilters.trimester}
        />
        <Select
          options={materials}
          placeholder="Select Material"
          onChange={(value) => onFilterChange("material", value)}
          value={selectedFilters.material}
        />
        <Select
          options={units}
          placeholder="Select Unit"
          onChange={(value) => onFilterChange("unit", value)}
          value={selectedFilters.unit}
        />
        <Select
          options={difficulties}
          placeholder="Select Difficulty"
          onChange={(value) => onFilterChange("difficulty", value)}
          value={selectedFilters.difficulty}
        />
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-2 flex justify-between items-center bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        > 
          <div className="flex flex-start align-center">
            <span>Filters</span>
            <Filter className="h-5 w-5 ml-2" />
          </div>
          {isDropdownOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {isDropdownOpen && (
          <div className="mt-2 p-4 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="flex flex-col space-y-4">
              <Select
                options={levels}
                placeholder="Select Level"
                onChange={(value) => onFilterChange("level", value)}
                value={selectedFilters.level}
              />
              <Select
                options={trimesters}
                placeholder="Select Trimester"
                onChange={(value) => onFilterChange("trimester", value)}
                value={selectedFilters.trimester}
              />
              <Select
                options={materials}
                placeholder="Select Material"
                onChange={(value) => onFilterChange("material", value)}
                value={selectedFilters.material}
              />
              <Select
                options={units}
                placeholder="Select Unit"
                onChange={(value) => onFilterChange("unit", value)}
                value={selectedFilters.unit}
              />
              <Select
                options={difficulties}
                placeholder="Select Difficulty"
                onChange={(value) => onFilterChange("difficulty", value)}
                value={selectedFilters.difficulty}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
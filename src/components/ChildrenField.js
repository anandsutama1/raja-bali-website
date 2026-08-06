"use client";

import { useState } from "react";

const OTHER_VALUE = "__other__";
const CHILDREN_OPTIONS = [1, 2, 3, 4, 5];

/**
 * Number-of-children dropdown (1-5, optional) with a "type manually" escape
 * hatch for larger groups — same combobox/manual-toggle pattern as
 * PhoneField's country code, so the two fields feel consistent.
 */
export default function ChildrenField({ value, onChange, className = "border p-3" }) {
  const [isManual, setIsManual] = useState(false);

  const handleSelectChange = (e) => {
    if (e.target.value === OTHER_VALUE) {
      setIsManual(true);
      onChange({ target: { value: "" } });
      return;
    }
    onChange(e);
  };

  const handleUseList = () => {
    setIsManual(false);
    onChange({ target: { value: "" } });
  };

  return isManual ? (
    <div className="flex flex-col gap-1">
      <input
        type="number"
        min="0"
        placeholder="Number of Children"
        value={value}
        onChange={onChange}
        className={className}
      />
      <button
        type="button"
        onClick={handleUseList}
        className="text-left text-xs text-gray-500 underline hover:text-raja-red"
      >
        Use list
      </button>
    </div>
  ) : (
    <select value={value} onChange={handleSelectChange} className={className}>
      <option value="">Number of Children</option>
      {CHILDREN_OPTIONS.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
      <option value={OTHER_VALUE}>Other (type manually)</option>
    </select>
  );
}

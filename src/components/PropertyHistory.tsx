import React from 'react';
import { History } from 'lucide-react';

interface PropertyHistoryProps {
  onPropertyIdChange: (propertyId: string) => void;
}

export function PropertyHistory({ onPropertyIdChange }: PropertyHistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History size={24} />
        <h2 className="text-xl font-bold">Property History</h2>
      </div>
      <div>
        <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
          Property ID
        </label>
        <input
          id="propertyId"
          type="text"
          placeholder="Enter Property ID"
          className="mt-1 w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => onPropertyIdChange(e.target.value)}
        />
      </div>
    </div>
  );
}
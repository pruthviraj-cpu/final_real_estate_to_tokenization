import React from 'react';
import { Users } from 'lucide-react';
import { PropertyLedger } from '../types';

interface OwnersListProps {
  ledger: PropertyLedger;
}

export function OwnersList({ ledger }: OwnersListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users size={24} />
        <h2 className="text-xl font-bold">Property Owners</h2>
      </div>
      {Object.entries(ledger).map(([propertyId, owners]) => (
        <div key={propertyId} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">Property ID: {propertyId}</h3>
          <ul className="mt-2 space-y-2">
            {Object.entries(owners).map(([owner, share]) => (
              <li key={owner} className="flex justify-between items-center">
                <span>{owner}</span>
                <span className="font-medium">{share}%</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
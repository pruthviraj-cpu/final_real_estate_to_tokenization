import React from 'react';
import { Building2, History, ListTree, Users } from 'lucide-react';

interface NavbarProps {
  onViewChange: (view: 'properties' | 'transaction' | 'history' | 'blockchain' | 'owners') => void;
}

export function Navbar({ onViewChange }: NavbarProps) {
  return (
    <nav className="bg-black text-white py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">7/12 Tokenization</h1>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: Building2, label: 'Properties', value: 'properties' },
              { icon: History, label: 'Transaction', value: 'transaction' },
              { icon: ListTree, label: 'History', value: 'history' },
              { icon: ListTree, label: 'Blockchain', value: 'blockchain' },
              { icon: Users, label: 'Owners', value: 'owners' },
            ].map(({ icon: Icon, label, value }) => (
              <button
                key={value}
                onClick={() => onViewChange(value as any)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors"
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
import React from 'react';

interface TransactionFormProps {
  formData: {
    propertyId: string;
    seller: string;
    buyer: string;
    price: string;
    sharePercentage: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TransactionForm({ formData, onSubmit, onChange }: TransactionFormProps) {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">New Transaction</h2>
      <div className="space-y-6">
        {[
          { id: 'propertyId', label: 'Property ID', type: 'text', placeholder: 'Enter property ID' },
          { id: 'seller', label: 'Seller', type: 'text', placeholder: 'Enter seller name' },
          { id: 'buyer', label: 'Buyer', type: 'text', placeholder: 'Enter buyer name' },
          { id: 'price', label: 'Price', type: 'number', placeholder: 'Enter price' },
          { id: 'sharePercentage', label: 'Share Percentage', type: 'number', placeholder: 'Enter share percentage' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={id}
              type={type}
              name={id}
              placeholder={placeholder}
              value={formData[id as keyof typeof formData]}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Submit Transaction
        </button>
      </div>
    </form>
  );
}
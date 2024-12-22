import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Blockchain } from './utils/blockchain';
import { generateMultipleCombinations } from './utils/propertyGenerator';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { TransactionForm } from './components/TransactionForm';
import { PropertyHistory } from './components/PropertyHistory';
import { OwnersList } from './components/OwnersList';

const blockchain = new Blockchain();
const properties = generateMultipleCombinations(5);

function App() {
  const [view, setView] = useState<'properties' | 'transaction' | 'history' | 'blockchain' | 'owners'>('properties');
  const [output, setOutput] = useState<string>('');
  const [formData, setFormData] = useState({
    propertyId: '',
    seller: '',
    buyer: '',
    price: '',
    sharePercentage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      blockchain.addTransaction(
        formData.propertyId,
        formData.seller,
        formData.buyer,
        parseFloat(formData.price),
        parseFloat(formData.sharePercentage)
      );
      
      toast.success('Transaction completed successfully!', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#FFFFFF',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '✅',
      });

      setFormData({
        propertyId: '',
        seller: '',
        buyer: '',
        price: '',
        sharePercentage: '',
      });
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#FFFFFF',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌',
      });
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'properties':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {properties.map((prop, index) => (
              <PropertyCard key={prop} propertyId={prop} index={index} />
            ))}
          </div>
        );

      case 'transaction':
        return (
          <TransactionForm
            formData={formData}
            onSubmit={handleSubmitTransaction}
            onChange={handleInputChange}
          />
        );

      case 'history':
        return (
          <PropertyHistory
            onPropertyIdChange={(propertyId) => {
              const history = blockchain.getPropertyHistory(propertyId);
              setOutput(JSON.stringify(history, null, 2));
            }}
          />
        );

      case 'blockchain':
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Blockchain</h2>
            <pre className="bg-gray-100 p-6 rounded-lg overflow-auto">
              {JSON.stringify(blockchain.getChain(), null, 2)}
            </pre>
          </div>
        );

      case 'owners':
        return <OwnersList ledger={blockchain.getLedger()} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Hero/>
      
      <Navbar onViewChange={setView} />
      <main className="container mx-auto px-4 pb-12">
        {renderContent()}
        {output && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <pre>{output}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
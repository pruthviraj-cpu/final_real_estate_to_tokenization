import React from 'react';
import { Building2 } from 'lucide-react';

interface PropertyCardProps {
  propertyId: string;
  index: number;
}

export function PropertyCard({ propertyId, index }: PropertyCardProps) {
  const images = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3x5gwCp2rw0SQ-8DGTgv0yLJIs6MRoeKwnQ&s',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154',
  ];

  return (
    <div className="group relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10" />
      <img
        src={`${images[index % 5]}?auto=format&fit=crop&w=800&q=80`}
        alt={`Property ${index + 1}`}
        className="w-full h-[400px] object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Luxury Villa {index + 1}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Building2 size={16} />
            <span>ID: {propertyId}</span>
          </div>
          <p className="text-sm text-gray-300">Premium Property Investment</p>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

import backgroundImage from 'C:/Users/gawan/OneDrive/Desktop/New folder/HACKATHON/HACKATHON/Slide1.jpg';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4" style={{float:'left'}}>
        <div className="flex items-center space-x-4 mb-8">
          
          <h1 className="text-7xl font-bold tracking-wider"
          style={{ fontFamily: "'Lobster', cursive" , float:'left',color:'white'}}>7/12</h1>
        </div>
        <h2 className="text-6xl font-bold mb-6" style={{ fontFamily: "'Lobster', cursive", float:'left',color:'white' }}>TOKENIZATION</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          Transform real estate ownership through blockchain technology. 
          Secure, transparent, and efficient property transactions.
        </p>
       
      </div>
    </div>
  );
};
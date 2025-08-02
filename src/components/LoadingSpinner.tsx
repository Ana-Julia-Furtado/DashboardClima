import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-white/70 animate-spin mx-auto" />
        <p className="text-white/60 text-lg">Carregando dados meteorológicos...</p>
      </div>
    </div>
  );
};
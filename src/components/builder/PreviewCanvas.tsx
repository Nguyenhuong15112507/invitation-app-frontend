'use client';

import { ReactNode } from 'react';

interface PreviewCanvasProps {
  children: ReactNode;
  height?: string;
  className?: string;
}

export default function PreviewCanvas({ children, height = 'min-h-screen', className = '' }: PreviewCanvasProps) {
  return (
    <div className={`max-w-md w-full ${height} bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 mx-auto relative overflow-hidden flex flex-col ${className}`}>
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-white">
        {children}
      </div>
    </div>
  );
}

// filepath: app/blockchain/layout.tsx
import { Suspense } from 'react';

export default function BlockchainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </Suspense>
  );
}

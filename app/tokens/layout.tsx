// filepath: app/tokens/layout.tsx
import { Suspense } from 'react';

export default function TokensLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </Suspense>
  );
}

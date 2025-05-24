'use client';

export default function SwapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-gray-50">
      {children}
    </section>
  );
}

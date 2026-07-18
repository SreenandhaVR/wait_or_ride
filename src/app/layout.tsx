import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Ride or Wait', description: 'Know Before You Board' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }

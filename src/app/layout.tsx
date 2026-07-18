import type { Metadata } from 'next';
import { CrowdStoreProvider } from '@/context/CrowdStore';
import { TripStoreProvider } from '@/context/TripStore';
import './globals.css';
export const metadata: Metadata = { title: 'Ride or Wait', description: 'Know Before You Board' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CrowdStoreProvider><TripStoreProvider>{children}</TripStoreProvider></CrowdStoreProvider></body></html>; }

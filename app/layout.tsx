import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Bugema Adventist Primary School',
  description: 'A Seventh-day Adventist primary school in Kampala, Uganda, offering holistic Christian education.',
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar isVisible={true} />
        <main className="pt-16 min-h-screen">{children}</main> {/* Added pt-16 to account for navbar height */}
        <Footer isVisible={true} isFixed={false} />
      </body>
    </html>
  );
}
// components/NavigationBar.js

import Link from 'next/link';

const NavigationBar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-gray-800">Your Logo</a>
          </Link>
        </div>

        {/* Menu (Right) */}
        <div className="space-x-6">
          <Link href="/">
            <a className="text-gray-700 hover:text-gray-900">Home</a>
          </Link>
          <Link href="/accommodation">
            <a className="text-gray-700 hover:text-gray-900">Accommodation</a>
          </Link>
          <Link href="/facilities">
            <a className="text-gray-700 hover:text-gray-900">Facilities</a>
          </Link>
          <Link href="/dining">
            <a className="text-gray-700 hover:text-gray-900">Dining</a>
          </Link>
          <Link href="/gallery">
            <a className="text-gray-700 hover:text-gray-900">Gallery</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
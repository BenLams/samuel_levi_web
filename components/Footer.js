import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function Footer({ isVisible, isFixed }) {
  const positionClass = isFixed ? 'fixed bottom-0 w-full z-50' : 'static';
  return (
    <footer className={`bg-blue-700/80 text-white py-6 px-4 text-center ${positionClass} transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Bugema Adventist Primary School</p>
          <p>Kampala, Uganda</p>
          <p>Email: info@bugemaaps.org</p>
          <p>Phone: +256 123 456 789</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-yellow-400 transition duration-200">About Us</Link></li>
            <li><Link href="/admission" className="hover:text-yellow-400 transition duration-200">Admissions</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* School Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Our School</h3>
          <p>Empowering young minds with faith and knowledge since 19XX.</p>
          <Image src="/images/school-logo.png" alt="Bugema APS Logo" width={64} height={64} className="mt-4 rounded-full mx-auto" />
        </div>
      </div>
      <div className="mt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Bugema Adventist Primary School. All rights reserved.</p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  isFixed: PropTypes.bool,
  isVisible: PropTypes.bool
};
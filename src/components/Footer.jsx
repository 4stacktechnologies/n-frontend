export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            4-Stack Technologies
          </h2>
          <p className="text-sm leading-relaxed">
            We build modern, scalable, and secure web applications using
            the latest technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <ul className="text-sm space-y-2">
            <li>Email: <span className="text-white">info@4stacktech.com</span></li>
            <li>Phone: <span className="text-white">+91 9XXXXXXXXX</span></li>
            <li>Location: <span className="text-white">India</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} 4-Stack Technologies. All rights reserved.
      </div>
    </footer>
  );
}

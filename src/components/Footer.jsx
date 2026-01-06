export default function Footer() {
  return (
    <footer className=" bg-gradient-to-b
                       from-[#1b1b33]
                       to-[#141428]
                       text-gray-300
                       border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-12
                      grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 tracking-wide">
            4-Stack Technologies
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            We build modern, scalable, and secure web applications using
            the latest technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-pink-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-pink-400 transition">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-pink-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-pink-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li>
              Email: <span className="text-white">info@4stacktech.com</span>
            </li>
            <li>
              Phone: <span className="text-white">+91 9XXXXXXXXX</span>
            </li>
            <li>
              Location: <span className="text-white">India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10
                      py-4 text-center text-sm
                      bg-[#141428]/80 backdrop-blur">
        © {new Date().getFullYear()}{" "}
        <span className="text-white">
          4-Stack Technologies
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
}

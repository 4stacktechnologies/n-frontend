export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 relative overflow-hidden">
      {/* Soft Background Accent Blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-pink-100/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-96 h-96 bg-purple-100/20 blur-3xl" />

      {/* Main Footer Panel */}
      <div className="relative max-w-full md:max-w-screen-xl mx-auto px-6 md:px-12 py-16 bg-white rounded-t-3xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand / About */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-wide">
            4-Stack Technologies
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            We build modern, scalable, and secure web applications using
            the latest technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          <ul className="flex flex-col space-y-2 text-gray-600">
            {["Home", "Products", "About", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link === "Home" ? "" : link.toLowerCase()}`}
                  className="transition-all duration-300 hover:text-pink-500 hover:rounded-md px-1 py-0.5"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>
              Email: <span className="text-gray-900 font-medium">info@4stacktech.com</span>
            </li>
            <li>
              Phone: <span className="text-gray-900 font-medium">+91 9XXXXXXXXX</span>
            </li>
            <li>
              Location: <span className="text-gray-900 font-medium">India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 text-gray-500 text-center py-4 border-t border-gray-200 rounded-t-xl">
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-900 font-medium">4-Stack Technologies</span>. All rights reserved.
      </div>
    </footer>
  );
}

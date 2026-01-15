export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 relative overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-pink-100/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-96 h-96 bg-purple-100/20 blur-3xl" />

      {/* Main footer */}
      <div className="
        relative
        max-w-screen-xl
        mx-auto
        px-4 sm:px-6 md:px-12
        py-10 sm:py-16
        bg-white
        rounded-t-3xl
        shadow-lg
        border border-gray-200
        grid grid-cols-3
        gap-4 sm:gap-8 md:gap-12
      ">

        {/* Brand */}
        <div className="space-y-2 sm:space-y-4">
          <h2 className="text-sm sm:text-xl font-bold text-gray-900">
            4-Stack
          </h2>
          <p className="text-[11px] sm:text-sm text-gray-500 leading-relaxed">
            Modern, scalable & secure web applications.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
            Quick Links
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm text-gray-600">
            {["Home", "Products", "About", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link === "Home" ? "" : link.toLowerCase()}`}
                  className="hover:text-pink-500 transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
            Contact
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm text-gray-600">
            <li className="font-medium text-gray-900">info@4stacktech.com</li>
            <li className="font-medium text-gray-900">+91 9XXXXXXXXX</li>
            <li className="font-medium text-gray-900">India</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="bg-gray-100 text-gray-500 text-center py-3 text-xs sm:text-sm border-t border-gray-200 rounded-t-xl">
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-900 font-medium">
          4-Stack Technologies
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
}

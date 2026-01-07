export default function Footer() {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-gradient-to-b
        from-[#0b0b1a]
        via-[#101028]
        to-[#05050f]
        text-gray-300
      "
    >
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-pink-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/20 blur-[160px]" />

      {/* Main Footer Panel */}
      <div
        className="
          relative
          max-w-7xl mx-auto
          px-6 py-14
          grid grid-cols-1 md:grid-cols-3 gap-12
          backdrop-blur-xl
          bg-white/5
          border border-white/10
          rounded-t-3xl
        "
      >
        {/* Brand / About */}
        <div>
          <h2
            className="
              text-xl font-bold text-white
              mb-4 tracking-wider
            "
          >
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
            {["Home", "Products", "About", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link === "Home" ? "" : link.toLowerCase()}`}
                  className="
                    text-gray-400
                    transition-all duration-300
                    hover:text-pink-400
                  "
                >
                  {link}
                </a>
              </li>
            ))}
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
      <div
        className="
          relative
          border-t border-white/10
          py-4 text-center text-sm
          bg-black/40
          backdrop-blur-xl
        "
      >
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">
          4-Stack Technologies
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
}

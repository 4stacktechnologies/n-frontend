import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141428] via-[#1b1b33] to-[#0f0f23] px-6 overflow-hidden">
      
      {/* Background glow blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 blur-[160px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 blur-[180px]" />

      <div className="relative z-10 text-center max-w-md">

        {/* COMPUTER NOT FOUND SVG */}
        <div className="flex justify-center mb-8">
          <svg
            width="260"
            height="160"
            viewBox="0 0 260 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90 drop-shadow-[0_0_20px_rgba(236,72,153,0.35)]"
          >
            {/* Screen */}
            <rect
              x="30"
              y="10"
              width="200"
              height="110"
              rx="12"
              stroke="#ec4899"
              strokeWidth="4"
            />

            {/* Eyes (X X) */}
            <line x1="90" y1="45" x2="110" y2="65" stroke="#a855f7" strokeWidth="4" />
            <line x1="110" y1="45" x2="90" y2="65" stroke="#a855f7" strokeWidth="4" />

            <line x1="150" y1="45" x2="170" y2="65" stroke="#a855f7" strokeWidth="4" />
            <line x1="170" y1="45" x2="150" y2="65" stroke="#a855f7" strokeWidth="4" />

            {/* Sad mouth */}
            <path
              d="M110 80 Q130 92 150 80"
              stroke="#9ca3af"
              strokeWidth="4"
              fill="none"
            />

            {/* Base */}
            <rect
              x="10"
              y="125"
              width="240"
              height="15"
              rx="6"
              fill="#ec4899"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* TITLE */}
        <h1 className="text-7xl font-extrabold mb-4 text-white tracking-wider drop-shadow-[0_0_25px_rgba(236,72,153,0.45)]">
          404
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-400 mb-8 text-lg">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* ACTION */}
        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            bg-gradient-to-r from-pink-400 to-purple-500
            hover:from-pink-300 hover:to-purple-400
            text-[#141428]
            px-6 py-3 rounded-xl
            font-semibold
            transition
            hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
          "
        >
          <Home size={18} />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

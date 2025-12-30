import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6">
      <div className="text-center max-w-md">

        {/* COMPUTER NOT FOUND IMAGE (INLINE SVG) */}
        <div className="flex justify-center mb-6">
          <svg
            width="260"
            height="160"
            viewBox="0 0 260 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-80"
          >
            {/* Screen */}
            <rect
              x="30"
              y="10"
              width="200"
              height="110"
              rx="10"
              stroke="#9CA3AF"
              strokeWidth="4"
            />

            {/* Eyes (X X) */}
            <line x1="90" y1="45" x2="110" y2="65" stroke="#9CA3AF" strokeWidth="4" />
            <line x1="110" y1="45" x2="90" y2="65" stroke="#9CA3AF" strokeWidth="4" />

            <line x1="150" y1="45" x2="170" y2="65" stroke="#9CA3AF" strokeWidth="4" />
            <line x1="170" y1="45" x2="150" y2="65" stroke="#9CA3AF" strokeWidth="4" />

            {/* Sad mouth */}
            <path
              d="M110 80 Q130 90 150 80"
              stroke="#9CA3AF"
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
              fill="#9CA3AF"
            />
          </svg>
        </div>

        {/* TITLE */}
        <h1 className="text-7xl font-extrabold text-white mb-4">
          404
        </h1>

        {/* MESSAGE */}
        <p className="text-slate-400 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* ACTION */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <Home size={18} />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

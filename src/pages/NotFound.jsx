import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6">
      <div className="text-center max-w-md">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <AlertTriangle size={64} className="text-red-500" />
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

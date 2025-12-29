import { AuthProvider } from "./auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer"; // Import the Footer component

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Main content grows */}
        <div className="flex-grow">
          <AppRoutes />
        </div>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

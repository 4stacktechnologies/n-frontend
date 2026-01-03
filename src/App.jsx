import { AuthProvider } from "./auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer"; // Import the Footer component

export default function App() {
  return (
    <AuthProvider>
          <AppRoutes />
    </AuthProvider>
  );
}

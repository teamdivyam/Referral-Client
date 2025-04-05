import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/authContext";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

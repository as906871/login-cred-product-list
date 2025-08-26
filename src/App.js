import { useEffect, useState } from "react";
import useAuth from "./viewmodels/useAuth";
import AuthPage from "./pages/AuthPage";
import InventoryPage from "./pages/InventoryPage"

function App() {
  const { user, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <InventoryPage user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;

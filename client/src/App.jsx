import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import { ThemeProvider } from "./context/themeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col h-full">
          <Header />
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AppContext";
import Header from "@/components/Header";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col h-full">
        <Header />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

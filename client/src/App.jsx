import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import { ThemeProvider } from "./context/themeContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster"


function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <AuthProvider>
            <div className="flex h-full flex-col">
              <Header />
              <div className="h-full">
                <Outlet />
              </div>
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

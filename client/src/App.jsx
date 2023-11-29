import { AuthProvider } from "@/context/AppContext";

import { ThemeProvider } from "./context/themeContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@/store";
import { Provider } from "react-redux";
import Layout from "./components/Layout";

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

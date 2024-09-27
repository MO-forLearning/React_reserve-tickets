import Router from "./Router";
import { TicketsProvider } from "./api/TicketsContext";
import { AuthProvider } from "./api/AuthContext";
import { PurchasesProvider } from "./api/PurchasesContext";

const App = () => {


  return (
    <>
      <AuthProvider>
        <TicketsProvider>
          <PurchasesProvider>
          <Router />
        </PurchasesProvider>
        </TicketsProvider>
      </AuthProvider>
    </>
  );
};

export default App;

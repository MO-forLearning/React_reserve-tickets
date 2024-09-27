import { useState, createContext } from "react";

export const PurchasesContext = createContext([]);

export const PurchasesProvider = ({ children }) => {
  const [purchases, setPurchases] = useState({
    ticketID: "",
    userID: "",
    numberOf: "",
  });

  return (
    <PurchasesContext.Provider value={[purchases, setPurchases]}>
      {children}
    </PurchasesContext.Provider>
  );
};

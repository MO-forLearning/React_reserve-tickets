import { useState, createContext } from "react";

export const PurchasedTicketsContext = createContext([]);

export const PurchasedTicketsProvider = ({ children }) => {
  const [purchasedTickets, setPurchasedTickets] = useState("");

  return (
    <PurchasedTicketsContext.Provider value={[purchasedTickets, setPurchasedTickets]}>
      {children}
    </PurchasedTicketsContext.Provider>
  );
};

import { useState, createContext, useEffect } from "react";
import axios from "axios";
import TicketsDataFunc from "../hooks/TicketsDataFunc";

export const TicketsContext = createContext([]);

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const url = "http://localhost:3001/api/get/tickets";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setTickets(TicketsDataFunc(res.data)))
      .catch((error) => console.log(error))
  }, []);

  return (
    <TicketsContext.Provider value={tickets}>
      {children}
    </TicketsContext.Provider>
  );
};

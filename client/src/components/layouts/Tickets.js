import { useContext } from "react";
import Ticket from "./../elements/Ticket";
import { TicketsContext } from "./../../api/TicketsContext";

const Tickets = () => {
  const tickets = useContext(TicketsContext);

  if (tickets.length === 0) return <p>現在販売中のチケットはありません。</p>;

  return (
    <>
      <div className="ticketBoxes">
        {tickets.length !== 0 &&
          tickets.map((ticket, index) => {
            return (
              <div key={index}>
                <Ticket ticket={ticket} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Tickets;

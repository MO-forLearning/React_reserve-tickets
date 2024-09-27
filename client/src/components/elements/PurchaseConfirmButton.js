import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PurchasedTicketsProvider } from "../../api/PurchasedTicketsContext";

const PurchaseConfirmButton = () => {
  const navigate = useNavigate();
  const purchasedTickets = useContext(PurchasedTicketsProvider);

  function handleClick() {
    navigate("/purchased", {state: purchasedTickets});
  }

  return (
    <>
      <button onClick={handleClick}>購入済チケットを見る</button>
    </>
  );
};

export default PurchaseConfirmButton;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, AuthContext } from "../../api/AuthContext";
import { PurchasesContext } from "../../api/PurchasesContext";

const BuyButton = ({ ticket }) => {
  const navigate = useNavigate();

  const [loggedIn] = useContext(LoggedInContext);
  const [authInfo] = useContext(AuthContext);
  const [number, setNumber] = useState(1);
  const [purchases, setPurchases] = useContext(PurchasesContext);

  function handleChange(e) {
    setNumber(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (ticket.purchased + Number(number) > ticket.numberOf) {
      alert("残チケット枚数が足りません。");
    } else {
      setPurchases({
        ticketID: ticket.ticketID,
        userID: authInfo.userID,
        numberOf: Number(number),
      });
      navigate("/confirm", { state: ticket });
    }
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        {!loggedIn && (
          <small style={{ color: "red" }}>
            ※チケット購入にはログイン/会員登録が必要です
          </small>
        )}
        {loggedIn && (
          <>
            <label htmlFor="numberOfTicket">
              枚数 {ticket.numberOf <= ticket.purchased + 5 && (
                <small className="note">(残りわずか{ticket.numberOf - ticket.purchased}枚)</small>
              )}：
              <select
                name="number"
                id="numberOfTicket"
                defaultValue="1"
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <button disabled={!loggedIn}>購入</button>
          </>
        )}
      </form>
    </>
  );
};

export default BuyButton;

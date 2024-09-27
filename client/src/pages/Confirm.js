import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoggedInContext } from "../api/AuthContext";
import { PurchasesContext } from "./../api/PurchasesContext";
import axios from "axios";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [ticket] = useState(location.state);
  const [loggedIn] = useContext(LoggedInContext);
  const [purchases] = useContext(PurchasesContext);

  if (loggedIn !== true) {
    return <p>ログインしてください</p>;
  }

  const url = "http://localhost:3001/purchases";

  function handleClick() {
    if (
      purchases.userID !== "" &&
      purchases.ticketID !== "" &&
      purchases.numberOf !== ""
    ) {
      axios
        .post(url, purchases)
        .catch((error) => console.log(error))
        .then(() => {
          navigate("/completed")
        });
    }
  }


  return (
    <>
      <h2>チケット購入前確認</h2>
      <div className="ticketBox">
        <h3>{ticket.ticketName}</h3>
        <dl>
          <dt>開催日</dt>
          <dd>
            開始：{ticket.startTime}
            <br />
            終了：{ticket.endTime}
          </dd>
        </dl>
        <dl>
          <dt>場所</dt>
          <dd>
            {ticket.placeName}
            <br />
            <small>{ticket.address}</small>
          </dd>
        </dl>
        <dl>
          <dt>価格</dt>
          <dd>{ticket.cost}円</dd>
        </dl>
        <dl>
          <dt>枚数</dt>
          <dd>{purchases.numberOf}枚</dd>
        </dl>
        <dl>
          <dt>合計金額</dt>
          <dd>{Number(ticket.cost) * Number(purchases.numberOf)}円</dd>
        </dl>
      </div>
      <button className="pageButton" onClick={handleClick}>
        購入を確定する
      </button>
    </>
  );
};

export default Confirm;

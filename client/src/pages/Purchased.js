import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TicketsDataFunc from "../hooks/TicketsDataFunc";
import { LoggedInContext, AuthContext } from "../api/AuthContext";
import { PurchasedTicketsContext } from "../api/PurchasedTicketsContext";

const Purchased = () => {
  const [purchasedTickets, setPurchasedTickets] = useContext(
    PurchasedTicketsContext
  );
  const [loggedIn] = useContext(LoggedInContext);
  const [authInfo] = useContext(AuthContext);

  useEffect(() => {
    if (!purchasedTickets && authInfo.userID) {
      const url = `http://localhost:3001/api/get/purchases/${authInfo.userID}`;
      axios
      .get(url)
      .catch((err) => console.log(err))
      .then((res) => {
        setPurchasedTickets(TicketsDataFunc(res.data))
      })
      .then(() => {
        const item = JSON.stringify(purchasedTickets)
        localStorage.setItem('ticket_purchasedTickets', item)
      });
    }
  }, []);

  if (loggedIn !== true) {
    return <p>ログインしてください</p>;
  }

  if (!purchasedTickets) {
    return <p>現在購入済みのチケットはありません。</p>;
  }

  if (!purchasedTickets.length > 0) {
    return <p>チケット情報取得中...</p>;
  }

  return (
    <>
      <h2>購入済みチケット一覧</h2>
      <div className="ticketBoxes">
        {purchasedTickets.length !== 0 &&
          purchasedTickets.map((ticket, index) => {
            return (
              <div className="ticketBox" key={index}>
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
                  <dd>{ticket.numberOf}枚</dd>
                </dl>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Purchased;

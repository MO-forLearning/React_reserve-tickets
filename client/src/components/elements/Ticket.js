import BuyButton from "./BuyButton";

const DayTicket = (props) => {
  const ticket = props.ticket;

  return (
    <>
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
        {!ticket.endFlg && !ticket.soldOutFlg && <BuyButton ticket={ticket} />}
        {ticket.endFlg && (
          <div>
            <small className="note">※販売終了</small>
          </div>
        )}
        {ticket.soldOutFlg && (
          <div>
            <small className="note">※完売</small>
          </div>
        )}
      </div>
    </>
  );
};

export default DayTicket;

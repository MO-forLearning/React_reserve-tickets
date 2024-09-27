// 開始時刻、終了時刻を「年月日00:00」に変換
const TicketsDataFunc = (tickets) => {
  if (tickets && tickets.length === 0) return;

  TimeSortFunc(tickets);

  tickets.forEach((val) => {
    val = EndFlgFunc(val);
    val = SoldOutFlgFunc(val);
    val.startTime = ConvertTime(val.startTime);
    val.endTime = ConvertTime(val.endTime);
  });

  function TimeSortFunc(tickets) {
    tickets.sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
  }

  // "2024-08-14T00:00:00.000Z"から"2024年8月14日9:00"に変換
  function ConvertTime(time) {
    const week = ["日", "月", "火", "水", "木", "金", "土"];

    time = new Date(time);
    const day = week[time.getDay()];

    time = time.toLocaleString("ja-JP").slice(0, -3); // ミリ秒表示を削除
    time = time
      .replace(/\//, "年")
      .replace(/\//, "月")
      .replace(/ /, `日（${day}）`); //年月日00:00に変更

    return time;
  }

  // 期限切れ「販売終了」ラベル
  function EndFlgFunc(ticket) {
    const today = new Date();
    ticket.endFlg = false;

    if (
      today.getTime() > new Date(ticket.endTime).getTime()
    ) {
      ticket.endFlg = true;
    }
    return ticket;
  }

  // 枚数0で「売切」ラベル
  function SoldOutFlgFunc(ticket) {
    ticket.soldOutFlg = false;

    if (
      ticket.numberOf - ticket.purchased <= 0
    ) {
      ticket.soldOutFlg = true;
    }
    return ticket;
  }

  return tickets;
};

export default TicketsDataFunc;

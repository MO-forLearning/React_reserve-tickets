import Tickets from "./../components/layouts/Tickets";

const Top = () => {

  return (
    <>
      <h2>チケット情報</h2>
      <Tickets />
      <p>
        <small>
          ※1回につき5枚まで購入可能です。<br/>
          ※チケットは完売次第、販売を終了いたします。<br/>
          ※キャンセル不可。<br/>
          ※途中でブラウザの戻るボタンを押さないでください。
        </small>
      </p>
    </>
  );
};

export default Top;

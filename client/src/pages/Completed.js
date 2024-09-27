import { useContext } from "react";
import PurchaseConfirmButton from "../components/elements/PurchaseConfirmButton";
import { LoggedInContext } from "../api/AuthContext";

const Completed = () => {
  const [loggedIn] = useContext(LoggedInContext);

  if (loggedIn !== true) {
    return <p>ログインしてください</p>
  }

  return (
    <>
      <p>チケット購入完了しました。</p>
      <PurchaseConfirmButton />
    </>
  );
};

export default Completed;

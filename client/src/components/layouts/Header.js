import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext, AuthContext } from "../../api/AuthContext";
import PurchaseConfirmButton from "../elements/PurchaseConfirmButton";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  function handleClick() {
    navigate("/login");
  }

  return (
    <header>
      <div className="headerInner">
        <div>
          <Link to="/">
            <h1>チケット予約サイト</h1>
          </Link>
          <small>※React学習のためのサイト制作物です。</small>
        </div>
        <div className="header_userInfo">
          {loggedIn && window.location.pathname !== "/login" && (
            <>
              <p>ようこそ {authInfo.userName}さん</p>
              <Link to="loggedOut">
                <button
                  onClick={() => {
                    setAuthInfo(null);
                    setLoggedIn(false);
                    if (localStorage.getItem("ticket_authInfo")) {
                      localStorage.removeItem("ticket_authInfo");
                    }
                    if (localStorage.getItem("ticket_purchasedTickets")) {
                      localStorage.removeItem("ticket_purchasedTickets");
                    }
                  }}
                >
                  ログアウト
                </button>
              </Link>
              <br />
            </>
          )}
          {loggedIn &&
            window.location.pathname !== "/purchased" &&
            window.location.pathname !== "/completed" && (
              <PurchaseConfirmButton />
            )}
          {!loggedIn &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/loggedOut" && (
              <button className="pageButton" onClick={handleClick}>
                ログイン/会員登録
              </button>
            )}
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;

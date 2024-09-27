import { useNavigate } from "react-router-dom";

const ToTopButton = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }


  return (
    <>
      <button className="pageButton" onClick={handleClick}>
        トップへ戻る
      </button>{" "}
    </>
  );
};

export default ToTopButton;

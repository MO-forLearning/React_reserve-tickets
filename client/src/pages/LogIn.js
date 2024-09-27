import { memo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInContext, AuthContext } from "./../api/AuthContext";
import axios from "axios";

const LogIn = memo(() => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // e.targetで取ってきたname, valueをformValuesの空のプロパティと値にそれぞれ代入
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      Object.keys(formErrors).length === 0 &&
      formValues.email !== "" &&
      formValues.password !== ""
    ) {
      axios
        .post("http://localhost:3001/login", formValues)
        .then((res) => {
          if (res.data !== "Failed") {
            setAuthInfo(res.data[0]);
            setLoggedIn(true);
            localStorage.setItem('ticket_authInfo', JSON.stringify(res.data[0]))
            navigate("/");
          } else {
            alert("ユーザー名またはパスワードが正しくありません");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "ユーザー名を入力してください。";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください。";
    }
    return errors;
  };

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>ログインページ</h2>
          <div>
            <div>
              <label htmlFor="ID（メールアドレス）">ID（メールアドレス）</label>
              <br />
              <input
                id="email"
                type="text"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <p className="errorMsg">{formErrors.email}</p>
            </div>
            <div>
              <label htmlFor="パスワード">パスワード</label>
              <br />
              <input
                id="password"
                type="text"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <p className="errorMsg">{formErrors.password}</p>
            </div>
          </div>
          <button className="pageButton">ログイン</button>
        </form>
      </div>
      <div className="newCustomer">
        <p>↓↓会員登録がまだの方はこちら↓↓</p>
        <Link to="/signUpForm">新規会員登録</Link>
      </div>
    </>
  );
});

export default LogIn;

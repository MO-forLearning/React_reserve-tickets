import { memo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, AuthContext } from "./../api/AuthContext";
import axios from "axios";

const SignUpForm = memo(() => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  const initialValues = { userName: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [emailErrors, setEmailErrors] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    
    if (!formValues.email) {
      setEmailErrors("メールアドレスを入力してください。");
    } else if (!formValues.email) {
      setEmailErrors("メールアドレスを入力してください。");
    } else if (!regex.test(formValues.email)) {
      setEmailErrors("正しいメールアドレスを入力してください。");
    } else {
      // メールアドレス登録済みか確認
      axios
        .post("http://localhost:3001/confirm/userEmail", formValues)
        .then((res) => {
          if (res.data === "Failed") {
            setEmailErrors("こちらのメールアドレスはすでに登録されています。");
          } else {
            setEmailErrors("");
          }
        });
    }

    if (
      Object.keys(formErrors).length === 0 &&
      emailErrors === "" &&
      formValues.userName !== "" &&
      formValues.email !== "" &&
      formValues.password !== ""
    ) {
      // 新規会員登録
      axios
        .post("http://localhost:3001/users", formValues)
        .then((res) => {
        })
        .catch((err) => console.log(err))
      // ログイン
      axios
        .post("http://localhost:3001/login", {email: formValues.email, password: formValues.password})
        .then((res) => {
          if (res.data !== "Failed") {
            setAuthInfo(res.data[0]);
            setLoggedIn(true);
            navigate("/successSignUp")
          } else {
            alert("エラーが発生しました。");
          }
        })
        .catch((err) => console.log(err))
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "名前を入力してください。";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください。";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>新規ユーザー登録</h2>
        <div className="uniForm">
          <div className="formField">
            <label htmlFor="名前">名前</label>
            <br />
            <input
              id="userName"
              type="text"
              name="userName"
              onChange={(e) => handleChange(e)}
            />
            <p className="errorMsg">{formErrors.userName}</p>
          </div>
          <div className="formField">
            <label htmlFor="メールアドレス">メールアドレス</label>
            <br />
            <input
              id="email"
              type="text"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <p className="errorMsg">{emailErrors}</p>
          </div>
          <div className="formField">
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
        <button className="pageButton">登録</button>
      </form>
    </div>
  );
});

export default SignUpForm;

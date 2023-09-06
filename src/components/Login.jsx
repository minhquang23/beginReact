import { useState } from "react";
import "../assets/css/components.scss";
import { loginApi } from "../services/UserServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();

  //---handleLogin---
  const handleLogin = async () => {
    setDisable(true);
    setLoading(true);

    try {
      if (email && password) {
        const account = {
          email: "eve.holt@reqres.in",
          // email: email,
          password: password,
        };
        let res = await loginApi(account);
        if (res?.data?.token) {
          loginContext(email, res?.data?.token);
          navigate("/");
          toast.success("Login succeed!");
        } else {
          if (res?.status === 400) {
            toast.error(res?.data?.error);
          }
        }
      }
    } catch (e) {
      toast.error("Something is error!");
    }
    setLoading(false);
    setDisable(false);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      toast.warn("Logined!");
    }
  }, []);

  //---handleLoadingButton---
  const handleButtonLogin = () => {
    email && password ? setDisable(false) : setDisable(true);
  };

  useEffect(() => {
    handleButtonLogin();
  }, [email, password]);

  return (
    <div className="login-container col-12 col-sm-4">
      <h3 className="title">Log in</h3>
      <div className="text">
        <span className="text-item">Email or Username</span>
        <span className="text-item">Login in with phone</span>
      </div>
      <div className="login-input">
        <input
          className="input-item"
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password">
          <input
            className="input-item password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="forget-pw">Forget Password</div>

      <button
        className="login-btn btn btn-danger "
        disabled={disable}
        onClick={handleLogin}
      >
        {loading && <i className="fa-solid fa-spinner fa-spin"></i>}
        Login
      </button>

      <div className="go-back">
        <i className="fa-solid fa-angle-left fa-xs"></i>
        <Link className="go-back-content" to="/" style={{ color: "black" }}>
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Login;

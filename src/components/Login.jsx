import { useState } from "react";
import "../assets/css/components.scss";
import { loginApi } from "../services/UserServices";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (email && password) {
        const account = {
          email: "eve.holt@reqres.in",
          password: password,
        };
        let res = await loginApi(account);
        if (res?.data?.token) {
          localStorage.setItem("token", res?.data?.token);
        }
      }
    } catch (e) {
      toast.error(e);
    }
  };
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
          {/* <i className="fa-regular fa-eye-slash"></i> */}
        </div>
      </div>

      <div className="forget-pw">Forget Password</div>

      <button
        className="login-btn btn btn-danger "
        disabled={email && password ? false : true}
        onClick={handleLogin}
      >
        Login
      </button>

      <div className="go-back">
        <i className="fa-solid fa-angle-left fa-xs"></i>
        <span className="go-back-content">Go back</span>
      </div>
    </div>
  );
};

export default Login;

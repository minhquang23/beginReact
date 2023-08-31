import "../assets/css/components.scss";

const Login = () => {
  return (
    <div className="login-container col-12 col-sm-4">
      <h3 className="title">Log in</h3>
      <div className="text">
        <span className="text-item">Email or Username</span>
        <span className="text-item">Login in with phone</span>
      </div>
      <div className="login-input">
        <input type="text" placeholder="Email or Username" />
        <input type="password" placeholder="Password" />
        <i class="fa-regular fa-eye-slash"></i>
      </div>
      <div className="forget-pw">Forget Password</div>
      <button className="login-btn btn btn-danger">Login</button>
      <div className="go-back">
        <i className="fa-solid fa-angle-left fa-xs"></i>
        <span className="go-back-content">Go back</span>
      </div>
    </div>
  );
};

export default Login;

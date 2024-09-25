import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/Auth/useContextAuth";
import { LoaderIcon } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated ,loading} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form" style={{maxWidth:"750px"}}>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">{loading?<LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />:"Login"}</button>
        </div>
      </form>
      <div  style={{ marginTop: "10px" }}>
        <NavLink to="/rejester">
          <span className=" btn--secondary">go to sign up</span>
        </NavLink>
      </div>
    </div>
  );
}
export default Login;

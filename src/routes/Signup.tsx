import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/Auth/useContextAuth";
import { LoaderIcon } from "react-hot-toast";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signup, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password && name) signup(name, email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer">
      <h2>Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <div className="formControl">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
        </div>
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
          <button className="btn btn--primary">
            {loading ? (
              <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
            ) : (
              "Signup"
            )}
          </button>
        </div>
      </form>
      <div  style={{ marginTop: "10px" }}>
        <NavLink to="/login">
          <span className=" btn--secondary">go to login</span>
        </NavLink>
      </div>
    </div>
  );
}
export default Signup;

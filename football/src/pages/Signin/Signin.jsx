import { Link, useNavigate } from "react-router-dom";
import api from "../../service/instance";
import { useState } from "react";
import { notifyError } from "../../utils/notify";
import "./signin-style.css";

function Signin() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  function handleChange({ target }) {
    setKey(target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!key) return notifyError("Please enter your key");
    try {
      const { data } = await api.get("/timezone", {
        headers: {
          "X-RapidAPI-Key": key,
          "X-APISports-Key": key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });

      if (data) {
        sessionStorage.setItem("key", key);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
      notifyError(error.response.data.message);
    }
  }

  return (
    <main className="container-main-signin">
      <section className="container-section-form-signin">
        <h2 className="h2-form-signin">Sign in!</h2>
        <form className="form-signin" onSubmit={handleSubmit}>
          <label className="label-signin metallic-effect">Your API Key</label>
          <input
            type="text"
            name="key"
            className="input-key"
            placeholder="API key"
            value={key}
            onChange={handleChange}
          />
          <span className="container-span-btn-signin">
            <button type="submit" className="btn-signin">
              Sign In
            </button>
          </span>
        </form>
        <p className="signup-link">
          {"Don't have an API key?"}{" "}
          <Link
            to="https://rapidapi.com/hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign up on RapidAPI
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Signin;

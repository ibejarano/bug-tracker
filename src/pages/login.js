import React, { useState } from "react";
import { authenticationService } from "../services/authentication-services";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerEmail = e => {
    setEmail(e.target.value);
  };

  const handlerPassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const params = { email, password };
    try {
      const res = await authenticationService.login(
        params.email,
        params.password
      );
			console.log("Response from server", res);
			props.updateLogin()
    } catch (error) {
      console.log(error.toString());
      setPassword("");
      props.history.push("/login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className="form-container" onSubmit={onSubmit}>
        <label>Email: </label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handlerEmail}
          value={email}
          required
        />
        <br />
        <label>Password: </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handlerPassword}
          value={password}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
